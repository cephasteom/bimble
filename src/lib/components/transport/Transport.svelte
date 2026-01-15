<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import { isPlaying, toggleIsPlaying, mapTransportKeys } from '$lib/stores/transport';
    import SVG from '$lib/components/SVG.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        return mapTransportKeys();
    });
</script>

<div class="transport">
        <Button
            onClick={toggleIsPlaying}
        >
            {#if $isPlaying}
                <SVG type="stop" />
            {:else}
                <SVG type="play" />
            {/if}
        </Button>
    </div>

<style>
    /* Component styles here */
</style>