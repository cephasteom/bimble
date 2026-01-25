<script lang="ts">
    import { midiSettingsOpen } from '$lib/stores/midi';
    import Dialog from '$lib/components/Dialog.svelte';
</script>

<Dialog 
    bind:open={$midiSettingsOpen}
    title="MIDI Settings"
>
    <h3>MIDI In</h3>
    <section>
        <label for="midi-in-device">Device</label>
        <select id="midi-in-device">
            <option disabled selected>Select a device</option>
            <!-- Options will be populated dynamically -->
        </select>
        <label for="midi-in-channel">Channel</label>
        <select id="midi-in-channel">
            <option disabled selected>All</option>
            <!-- Options will be populated dynamically -->
        </select>
    </section>

    <h3>MIDI Out</h3>
    <section>
        <label for="midi-out-device">Device</label>
            <select id="midi-out-device">
                <option disabled selected>Select a device</option>
                <!-- Options will be populated dynamically -->
            </select>
            <label for="midi-out-channel">Channel</label>
            <select id="midi-out-channel">
                <option disabled selected>All</option>
                <!-- Options will be populated dynamically -->
            </select>
    </section>
</Dialog>