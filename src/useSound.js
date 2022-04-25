import { useRef } from 'react'
import { Player } from 'tone'

export const useSound = (soundUrl) => {
    const sound = useRef(new Player(soundUrl, () => {
        console.log('ready')
    }).toDestination())
    return sound.current
}