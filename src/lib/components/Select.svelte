<script lang="ts">
    export let id = '';
    export let label = '';
    export let value: string | number | null = '';
    export let options: {label: string, value: string | number | null}[] = [];
    export let onChange: (value: string | number | null) => void = () => {};

    function handleChange(event: Event) {
        value = (event.target as HTMLSelectElement)?.value;
        onChange(value);
    }
</script>

<div class="select-container">
    {#if label}
        <label for={id}>{label}</label>
    {/if}
    <select 
        {id}
        bind:value 
        on:change={handleChange}>
        {#each options as option, i}
            <option 
                selected={option.value === value}
                value={option.value}
            >
                {option.label}
            </option>
        {/each}
    </select>
</div>

<style lang="scss">
    div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
    }
    select {
        border: 1px solid white;
        border-radius: var(--border-radius);
        background: transparent;
        color: white;
        display: inline;
        width: 100%;
        font-size: 1rem;
        padding: 0.25rem 2.5rem 0.25rem 0.75rem;

        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        padding-right: 2.5rem;
        background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.707031 0.707092L7.70703 7.70709L14.707 0.707092" stroke="white" stroke-width="2"/></svg>');
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        background-size: .75rem;
    }

    option {
        background: var(--background-color);
        color: white;
    }
</style>
