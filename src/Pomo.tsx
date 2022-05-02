import { useEffect, useReducer } from 'react';
import { PomoTimerDisplay } from './PomoTimerDisplay';
import { PomoIntervalDisplay } from './PomoIntervalDisplay';
import { PomoStartStopButton } from './PomoStartStopButton';
import { PomoTaskTally } from './PomoTaskTally';

export enum PomoIntervalType {
    Task,
    ShortBreak,
    LongBreak
}

export const PomoIntervalDuration = (interval: PomoIntervalType) => {
    switch(interval) {
        case PomoIntervalType.Task:
            return 25 * 60
        case PomoIntervalType.ShortBreak:
            return 5 * 60
        case PomoIntervalType.LongBreak:
            return 30 * 60
    }
}

export const PomoIntervalString = (interval: PomoIntervalType) => {
    switch(interval) {
        case PomoIntervalType.Task:
            return "Task"
        case PomoIntervalType.ShortBreak:
            return "Short Break"
        case PomoIntervalType.LongBreak:
            return "Long Break"
    }
}

export type PomoReducerState = {
    active: boolean,
    interval: PomoIntervalType,
    time: number,
    num_intervals: number
}

type PomoReducerAction = 
    | { type: 'active', payload: boolean }
    | { type: 'interval', payload: PomoIntervalType }
    | { type: 'time', payload: number }
    | { type: 'num_intervals', payload: number }

const initialPomoState = {
    active: false,
    interval: PomoIntervalType.Task,
    time: PomoIntervalDuration(PomoIntervalType.Task),
    num_intervals: 1
}

function pomoReducer(state: PomoReducerState, action: PomoReducerAction) {
    console.log("ACTION: " + JSON.stringify(action))
    switch(action.type) {
        case 'active':
            return { ...state, active: action.payload }
        case 'interval':
            return { ...state, interval: action.payload }
        case 'time':
            return { ...state, time: action.payload }
        case 'num_intervals':
            return { ...state, num_intervals: action.payload }
        default:
            throw new Error()
    }
}

export function Pomo() {
    const [state, dispatch] = useReducer(pomoReducer, initialPomoState);
    const togglePomoState = () => {
        dispatch({ type: 'active', payload: !state.active })
        return state.active
    }
    useEffect(() => {
        const nextInterval = () => {
            if ( state.interval === PomoIntervalType.Task ) {
                if ( state.num_intervals % 4 === 0 ) {
                    return PomoIntervalType.LongBreak
                } else {
                    return PomoIntervalType.ShortBreak
                }
            } else {
                    return PomoIntervalType.Task
            }
        }
        const updateTimer = async () => {
            const sleep = async (s: number) => {
                return new Promise(r => setTimeout(r, s * 1000))
            }
            if ( state.time > 0 ) {
                await sleep(1)
                dispatch({type: 'time', payload: state.time - 1})
            } else {
                if ( state.interval === PomoIntervalType.Task )
                    dispatch({type: 'num_intervals', payload: state.num_intervals + 1})
                const nextIntervalType = nextInterval()
                dispatch({ type: 'interval', payload: nextIntervalType })
                dispatch({ type: 'time', payload: PomoIntervalDuration(nextIntervalType) })
                dispatch({ type: 'active', payload: false})
            }
        }
        if ( state.active )
            updateTimer()
    }, [state])

    return (
        <main className={state.active ? "timer-active" : "timer-inactive"}>
            <PomoIntervalDisplay pomoState={state} />
            <PomoTimerDisplay pomoState={state} />
            <PomoTaskTally pomoState={state} />
            <PomoStartStopButton pomoState={state} toggleState={togglePomoState} />
        </main>
    )
}