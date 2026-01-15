import { getTransport, immediate, Loop, getDraw } from 'tone'
import { writable, get } from 'svelte/store';
import { divisions, query } from './sequencer';

export const cps = writable(.25);
export const t = writable(-1); // time pointer in divisions
export const isPlaying = writable(false);
export const toggleIsPlaying = () => isPlaying.update(p => !p);

const transport = getTransport()
const draw = getDraw();

new Loop(time => {
    // get time pointer
    const nextT = get(t) + 1;
    // advance time pointer at scheduled time
    draw.schedule(() => t.set(nextT), time);
    // set transport bpm based on cps store
    transport.bpm.setValueAtTime(240 * get(cps), time);

    const events = query(nextT);
    // TODO: trigger events at scheduled time

}, `${divisions}n`).start(0);

const play = () => transport.start('+0.1');
const stop = () => {
    t.set(-1);
    transport.stop(immediate());
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
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
        window.removeEventListener('keydown', handleKeyDown);
    };
};