import { getTransport, immediate, Loop, getDraw } from 'tone'
import { writable, get } from 'svelte/store';
import { bars, divisions, divisionToPosition, query, quantize } from './sequencer';
import { connections } from './midi';
import { WebMidi } from 'webmidi';
import { beepAt } from '$lib/sound/utils';

export const cps = writable(.25);
export const t = writable(-1); // time pointer in divisions
export const startedAt = writable<number | null>(null);

export const isPlaying = writable(false);
export const toggleIsPlaying = () => isPlaying.update(p => !p);

export const isRecording = writable(false);
export const toggleIsRecording = () => isRecording.update(r => !r);

export const isMetronome = writable(false);
export const toggleIsMetronome = () => {
    isMetronome.update(m => !m);
    localStorage.setItem("bs.isMetronome", JSON.stringify(get(isMetronome)));
};

const transport = getTransport()
const draw = getDraw();

isPlaying.subscribe(playing => {
    playing
        ? startedAt.set((immediate()) * 1000)
        : isRecording.set(false);
});
isRecording.subscribe(recording => recording && isPlaying.set(true));

new Loop(time => {
    const delta = time - immediate()
    
    // get time pointer
    const nextT = get(t) + 1;
    const nextPosition = divisionToPosition(nextT);
    const cycleDuration = (1/get(cps)) * 1000; // in ms

    // advance time pointer at scheduled time
    draw.schedule(() => get(isPlaying) && t.set(nextT), time);

    // set transport bpm based on cps store
    transport.bpm.setValueAtTime(240 * get(cps), time);

    // if metronome is enabled, play click sound
    get(isMetronome) && !(nextT%2) && beepAt(time);

    const events = query(divisionToPosition(nextT));
    const conns = get(connections);
    Object.entries(events).forEach(([sequencerIndex, notes]) => {
        const output = conns[parseInt(sequencerIndex)]?.output;
        if (!output) return;

        const midiOutput = WebMidi.getOutputByName(output);
        if (!midiOutput) return;
        
        notes.forEach(({ position, note, amp, duration }) => {
            const noteDelta = get(quantize) ? 0 : (position - nextPosition) * cycleDuration;
            const latencyCompensation = 115; // in ms, empirical value to offset scheduling latency
            
            midiOutput.playNote(note, { 
                attack: amp, 
                duration, 
                time: `+${(delta * 1000) + (noteDelta - latencyCompensation)}`,
            });
        });
    });

}, `${divisions}n`).start(0);

const play = () => transport.start();
const stop = () => {
    transport.stop(immediate());
    t.set(-1);
}

isPlaying.subscribe(playing => playing
    ? play()
    : stop()
);

export const mapTransportKeys = () => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.code === 'Space') {
            toggleIsPlaying();
            e.preventDefault();
        }
        if (e.code === 'KeyR' && !e.metaKey && !e.ctrlKey && !e.altKey) {
            toggleIsRecording();
            e.preventDefault();
        }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
};

/**
 * Convert a time in ms to a position within the cycle.
 * @param time 
 * @returns
 */
export function timeToPosition(time: number) {
    const pointer = time - get(startedAt)!;
    const cycleDuration = (1/get(cps)) * 1000; // in ms
    const positionInCycle = (pointer % (cycleDuration * bars)) / cycleDuration;
    return positionInCycle;
}