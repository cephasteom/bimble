import { Oscillator } from "tone";

export function beepAt(time: number) {

    const osc = new Oscillator();
    osc.toDestination();

    osc.start(time);
    osc.stop(time + 0.01);
}
