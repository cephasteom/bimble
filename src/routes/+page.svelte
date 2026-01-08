<script lang="ts">
    import '/node_modules/normalize.css/normalize.css';
    import '$lib/styles.css';

    import Sequencer from '$lib/sequencer/Sequencer.svelte';
</script>

<main>
    <div class="sequencer">
        <Sequencer />
    </div>
</main>

<style lang="scss">
    .sequencer {
        width: 100%;
        box-sizing: border-box;
    }
</style>