<script lang="ts">
    import { sequencers } from '$lib/stores/sequencer';
    import Sequencer from './Sequencer.svelte';
</script>

<section class="sequencers">
    {#each Array(sequencers) as _, key}
        <Sequencer id={key} />
    {/each}
</section>

<style lang="scss">
    .sequencers {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: .5rem;
        // padding: 1rem 2rem;
    }
</style>