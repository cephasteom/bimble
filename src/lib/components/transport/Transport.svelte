<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import { isPlaying, toggleIsPlaying, isRecording, toggleIsRecording, mapTransportKeys, toggleIsMetronome, isMetronome } from '$lib/stores/transport';
    import SVG from '$lib/components/SVG.svelte';
    import { onMount } from 'svelte';

    onMount(() => {
        // return mapTransportKeys();
    });
</script>

<div class="transport">
    <div class="transport__item">
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
    
    <div class="transport__item">
        <Button
            onClick={toggleIsRecording}
        >
            {#if $isRecording}
                <SVG type="circle--solid" />
            {:else}
                <SVG type="circle" />
            {/if}
        </Button>
    </div>

    <div class="transport__item">
        <Button
            onClick={toggleIsMetronome}
        >
            {#if $isMetronome}
                <SVG type="bell--solid" />
            {:else}
                <SVG type="bell" />
            {/if}
        </Button>
    </div>
</div>

<style lang="scss">
    .transport {
        display: flex;
        gap: 1.5rem;
        background-color: var(--black-lighter);
        border-radius: 15px;
        padding: .75rem 1.5rem;

        &__item {
            padding-right: 1.5rem;
            border-right: 1px solid var(--grey-lighter);
        }
    }
</style>