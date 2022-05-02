import { PomoReducerState } from './Pomo';

type Props = {
    toggleState: () => boolean,
    pomoState: PomoReducerState
}

export function PomoStartStopButton(props: Props) {
    const { toggleState, pomoState } = props
    return <div id="start-stop-button">
        <input type="button" onClick={toggleState} value={pomoState.active ? "STOP" : "START"} 
            title={pomoState.active ? "Stop Timer Button" : "Start Timer Button" } />
    </div>
}