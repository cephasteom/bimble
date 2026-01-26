<script lang="ts">
    import { 
        midiSettingsOpen, inputs, outputs, 
        connectInput, connectOutput, 
        setInputChannel, setOutputChannel,
        connections 
    } from '$lib/stores/midi';
    
    import { sequencers } from '$lib/stores';
    import Dialog from '$lib/components/Dialog.svelte';
    import Select from './Select.svelte';

    export let sequencer: string | number = 'all'
</script>

<Dialog 
    bind:open={$midiSettingsOpen}
    title="MIDI Settings"
>
    <h3>Sequencer</h3>
    <Select 
        id="midi-settings-for"
        value={sequencer}
        options={ [
            {label: "All", value: "all"},
            ...Array.from({length: sequencers }, (_, i) => ({ label: `${i + 1}`, value: `${i}` }))
        ] }
        onChange={(value) => sequencer = value ? value : 'all'}
    />
    <h3>MIDI In</h3>
    <section>
        <Select 
            id="midi-in-device"
            label="Device"
            value={$connections[sequencer]?.input || ''}
            options={ $inputs.map(input => ({ label: input, value: input })) }
            onChange={(value) => connectInput(sequencer, `${value}`)}
            />
        <Select 
            id="midi-in-channel"
            label="Channel"
            value={$connections[sequencer]?.inputChannel === null ? 'all' : $connections[sequencer]?.inputChannel}
            options={[{ label: 'All', value: 'all' }, ...Array.from({ length: 16 }, (_, i) => ({ label: `${i + 1}`, value: i }))]}
            onChange={(value) => setInputChannel(sequencer, value === 'all' ? null : value ? +value : null )}
        />
    </section>

    <h3>MIDI Out</h3>
    <section>
        <Select 
            id="midi-out-device"
            label="Device"
            options={ $outputs.map(output => ({ label: output, value: output })) }
            value={$connections[sequencer]?.output || ''}
            onChange={(value) => connectOutput(sequencer, `${value}`)}
            />
        <Select 
            id="midi-out-channel"
            label="Channel"
            value={$connections[sequencer]?.outputChannel === null ? 'all' : $connections[sequencer]?.outputChannel}
            options={[{ label: 'All', value: 'all' }, ...Array.from({ length: 16 }, (_, i) => ({ label: `${i + 1}`, value: i }))]}
            onChange={(value) => setOutputChannel(sequencer, value === 'all' ? null : value ? +value : null )}
            />
    </section>
</Dialog>

<style lang="scss">
    h3 {
        padding-bottom: .5rem;
        border-bottom: 1px solid white;
    }

    section {
        margin-bottom: 1rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
</style>