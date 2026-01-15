<script lang="ts">
    export let row: number;
    export let division: number;
    export let note: number;
    export let highlighted: boolean;
    export let on: boolean;
    export let active: boolean;
    export let handleMouseOver: () => void;
    export let handleMouseDown: (division: number, note: number) => void;
    export let handleMouseUp: (division: number, note: number) => void;
    export let mouseIsDown: boolean;
</script>

<button 
    class="cell" 
    style="grid-column: {division + 1}; grid-row: {row};"
    class:cell--highlighted={highlighted}
    class:cell--on={on}
    class:cell--active={active}
    class:mouseIsDown={mouseIsDown}
    aria-label="Toggle note {note} at division {division + 1}"
    on:mouseover={handleMouseOver}
    on:focus={handleMouseOver}
    on:mousedown={() => handleMouseDown(division, note)}
    on:mouseup={() => handleMouseUp(division, note)}
>
</button>

<style lang="scss">
.cell {
    border: 0;
    box-sizing: border-box;
    height: 1.5rem;
    background-color: transparent;
    cursor: pointer;
    padding: 0;
    position: relative;
    background-color: rgba(255, 255, 255, 0.05);

    &--highlighted {
        background-color: rgba(255, 255, 255, 0.1);
    }
    &:hover:not(&--on) {
        background-color: rgba(255, 255, 255, 0.1);
    }
    &--on {
        background-color: rgba(255, 255, 255, 0.5);
    }
    &--active:not(&--on) {
        background-color: rgba(0, 0, 0, 0.01);
    }

    &.mouseIsDown:hover {
        background-color: rgba(255, 255, 255, 0.5);
    }
}
</style>
    