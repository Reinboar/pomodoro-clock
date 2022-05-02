import { PomoReducerState } from './Pomo'

type Props = {
    pomoState: PomoReducerState
}

export function PomoTimerDisplay(props: Props) {
    const { pomoState } = props
    const currentSeconds = pomoState.time % 60
    const currentMinutes = Math.floor(pomoState.time / 60)
    return <div id="timer-display">
        <time dateTime={"PT" + currentMinutes + "M" + currentSeconds + "S"}>
            {currentMinutes.toString().padStart(2, '0') + ":" + currentSeconds.toString().padStart(2, '0')}
        </time>
    </div>
}