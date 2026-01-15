import { getTransport, immediate, Loop, getDraw } from 'tone'
import { writable, get } from 'svelte/store';
import { divisions, query } from './sequencer';

export const cps = writable(.25);
export const t = writable(-1); // time pointer in divisions
export const isPlaying = writable(true);

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
    console.log(events)
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