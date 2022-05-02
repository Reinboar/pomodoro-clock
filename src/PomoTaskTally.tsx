import { PomoReducerState } from './Pomo';

type Props = {
    pomoState: PomoReducerState
}

export function PomoTaskTally(props: Props) {
    const { pomoState } = props
    const tallyMarks = (pomoState.num_intervals - 1) % 4
    return <div id="task-tally">
        <div className={"tally-mark" + (tallyMarks > 0 ? " tallied" : "") } />
        <div className={"tally-mark" + (tallyMarks > 1 ? " tallied" : "") } />
        <div className={"tally-mark" + (tallyMarks > 2 ? " tallied" : "") } />
    </div>
}