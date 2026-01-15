<script lang="ts">
    import '/node_modules/normalize.css/normalize.css';
    import '$lib/styles.css';

    import Sequencer from '$lib/components/sequencer/Sequencer.svelte';
    import { data } from '$lib/stores/sequencer';
</script>

<main>
    <div class="sequencers">
        {#each Object.keys($data) as key}
            <Sequencer id={+key} />
        {/each}
    </div>
</main>

<style lang="scss">
    .sequencers {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
</style>