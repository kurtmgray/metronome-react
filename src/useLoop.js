import { useRef } from 'react'
import { Loop } from 'tone'

export const useLoop = (cb, interval) => {
    const player = useRef(new Loop(cb, interval))
    return player.current
}