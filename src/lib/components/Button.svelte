<script lang="ts">
    export let onClick = () => {};
    export let width = 'auto';
    export let label = '';
</script>

<button class="btn" on:click={onClick} style="width: {width};">
    <slot></slot>
    {#if label}
        <span>{label}</span>
    {/if}
</button>

<style lang="scss">
    .btn {
        padding: 0.5rem;
        border: none;
        background-color: transparent;
        color: white;
        border-radius: 3px;
        opacity: 0.9;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        cursor: pointer;
    }
</style>