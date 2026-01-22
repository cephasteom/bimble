<script lang="ts">
  import Button from "./Button.svelte";
  import SVG from "./SVG.svelte";


</script>

<aside class="sidebar">
    <Button
        label="Step"
    >
        <SVG type="piano" />
    </Button>
</aside>

<style lang="scss">
    .sidebar {
        padding: 8rem 1.5rem 1.5rem 1.5rem;
        background-color: var(--black-lighter);
        min-height: calc(100vh - var(--header-height));
        box-sizing: border-box;
    }
</style>