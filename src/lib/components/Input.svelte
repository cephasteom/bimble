<script lang="ts">
    import { onMount } from 'svelte';

    export let onInput: (value: string) => void = () => {};
    export let value: number | string;
    export let prefix: string = '';
    export let suffix: string = '';
    export let hasError: boolean = false;
    
    let inputElement: HTMLInputElement;
    let mirrorSpan: HTMLSpanElement;
    
    let container: HTMLElement;
    
    function setSize() {
        if(!mirrorSpan || !inputElement) return;
        console.log('setSize');
        mirrorSpan.textContent = `${value}`;
        console.log('mirrorSpan width:', mirrorSpan.getBoundingClientRect());
        const width = mirrorSpan.getBoundingClientRect().width;
        inputElement.style.width = `${width}px`;
    }

    function handleOnInput(e: Event) {
        onInput((e.target as HTMLInputElement).value);
        setSize();
    }

    onMount(() => setTimeout(setSize, 10));
</script>

<div>
    {#if prefix}
        <button on:click={() => inputElement.focus()} class="prefix">{prefix}</button>
    {/if}
    <div 
        class="input"
        bind:this={container}
        class:input--error={hasError}
    >
        <input 
            bind:this={inputElement} 
            on:input={handleOnInput}
            bind:value 
            class="input__input"
        />
        <span 
            class="input__mirror" 
            bind:this={mirrorSpan}
        ></span>
    </div>
    {#if suffix}
        <button on:click={() => inputElement.focus()} class="suffix">{suffix}</button>
    {/if}
</div>

<style lang="scss">
    .input {
        display: inline-grid;
        box-sizing: border-box;
        border-radius: 4px;
        position: relative;
        &--error {
            outline: 2px dotted var(--theme-5);
        }

        &__input, &__mirror {
            grid-area: 1 / 1;
            font: inherit;
            padding: 0 0.25rem;
        }

        &__input {
            font-size: 1.5rem;
            border: none;
            border-radius: 3px;
            text-align: center;
            background-color: var(--black-lighter);
            color: white;
            width: 1ch;
            overflow: visible;
            padding: 0;
        }

        &__mirror {
            visibility: hidden;
            white-space: pre;
            padding: 0 0.25rem;
            width: fit-content;
        }

    }
    

    .suffix, .prefix {
        color: white;
        font-size: 1.5rem;
        text-transform: none;
        background: transparent;
        border: none;
        cursor: text;

        &:focus {
            outline: none;
        }
    }
</style>