import { PomoIntervalString, PomoReducerState } from './Pomo'

type Props = {
    pomoState: PomoReducerState
}

export function PomoIntervalDisplay(props: Props) {
    const { pomoState } = props
    return <div id="interval-display">
        {PomoIntervalString(pomoState.interval)}
    </div>
}