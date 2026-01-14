import { getTransport, immediate, Loop, getDraw } from 'tone'
import { writable, get } from 'svelte/store';
import { divisions } from './musical';

export const cps = writable(.25);
export const t = writable(0); // time pointer in divisions
export const isPlaying = writable(true);

const transport = getTransport()
const draw = getDraw();

new Loop(time => {
    draw.schedule(() => t.update(t => t + 1), time);
    transport.bpm.setValueAtTime(240 * get(cps), time);
}, `${divisions}n`).start(0);

const play = () => transport.start('+0.1');
const stop = () => {
    t.set(0);
    transport.stop(immediate());
}

isPlaying.subscribe(playing => playing
    ? play()
    : stop()
);