<script lang="ts">
  import Button from "./Button.svelte";
  import SVG from "./SVG.svelte";
  import { midiSettingsOpen } from '$lib/stores/midi';
</script>

<aside class="sidebar">
    <Button
        label="Step"
        padding={'0'}
    >
        <SVG type="piano" width="2rem" />
    </Button>
    
    <Button
        label="MIDI"
        padding={'0'}
        onClick={() => midiSettingsOpen.set(true)}
    >
        <SVG type="midi" width="2rem" />
    </Button>
</aside>

<style lang="scss">
    .sidebar {
        padding: 7.9rem var(--spacer) var(--spacer) var(--spacer);
        background-color: var(--black-lighter);
        min-height: calc(100vh - var(--header-height));
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 3rem;
    }
</style>