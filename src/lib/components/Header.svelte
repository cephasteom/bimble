<script lang="ts">
    import { aboutOpen } from '$lib/stores';
    import Button from './Button.svelte';
</script>

<header class="header">
    <h1>ByteStep</h1>
    <nav>
        <Button onClick={() => aboutOpen.set(true)}>
            <span>About</span>
        </Button>
    </nav>
</header>

<style lang="scss">
    .header {
        height: var(--header-height);
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        padding: var(--spacer);
        background-color: #000;
        h1 {
            margin: 0;
            color: #fff;
        }

        span {
            font-size: 1.25rem;
            color: white;
        }
    }
</style>