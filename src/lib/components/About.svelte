<script lang="ts">
    import { aboutOpen } from '$lib/stores';
    import Dialog from '$lib/components/Dialog.svelte';
</script>

<Dialog 
    bind:open={$aboutOpen}
    title="About"
>
    <p>ByteStep is a web-based MIDI sequencer for recording and transforming patterns. It aims to combine the convenience of a DAW with the flexibility of code.</p>
    <p>Record or input a sequence of notes. Then, transform the sequence by manipulating time using a bytebeat function.</p>
    <p>© 2026 Peter Thomas | <a href="https://cephasteom.co.uk">cephasteom.co.uk</a></p>
</Dialog>

<style lang="scss">
    p {
        margin-top: 0;
        text-transform: none;

    }
</style>