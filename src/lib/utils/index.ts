import { timeSignature } from "$lib/stores";
import { get } from "svelte/store";
import { getTransport } from "tone";

export function toneTimeToPosition(toneTime: string): number {
    const [bars, quarters, sixteenths] = toneTime.split(':').map(Number);
    const beats = 1 / get(timeSignature) * quarters;
    const divisions = Math.floor(sixteenths) / (get(timeSignature) * 4);
    return bars + beats + divisions;
}

export function getPosition() : number {
    const toneTime = getTransport().position as string;
    return toneTimeToPosition(toneTime);
}

export function mod(n: number, m: number): number {
    return ((n % m) + m) % m;
}

export function debounce<F extends (...args: any[]) => any>(func: F, wait: number): F {
    let timeout: ReturnType<typeof setTimeout>;
    return function(this: any, ...args: any[]) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    } as F;
}

export function clamp(num: number, min: number, max: number): number {
    return Math.min(Math.max(num, min), max);
}