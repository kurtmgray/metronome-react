import React, { createContext, useContext, useReducer, useEffect } from 'react'
import * as Tone from 'tone'
import { useSound } from './useSound'
import { useLoop } from './useLoop'
import { Part, TransportTime } from 'tone'

const initialState = {
    isPlaying: false,
    tempo: Tone.Transport.bpm.value,
    beatsPerMeasure: 4,
    sixtVol: -50,
    eighVol: -50,
    quarVol: -50,
    tripVol: -50,
    measVol: -50,
    mastVol: -50,
    measUrl: 'http://127.0.0.1:5501/sounds/boom.wav',
    quarUrl: 'http://127.0.0.1:5501/sounds/kick.wav',
    eighUrl: 'http://127.0.0.1:5501/sounds/ride.wav',
    tripUrl: 'http://127.0.0.1:5501/sounds/snare.wav',
    sixtUrl: 'http://127.0.0.1:5501/sounds/tink.wav',
    lastClick: null,
    secondToLastClick: null,
    activeProgram: undefined,
    programMode: false,
    program: [
        {
            tempo: 160,
            iterations: 2,
            timeSignature: 4,
            sounds: {
                measUrl: 'http://127.0.0.1:5501/sounds/boom.wav',
                quarUrl: 'http://127.0.0.1:5501/sounds/kick.wav',
                eighUrl: 'http://127.0.0.1:5501/sounds/ride.wav',
                tripUrl: 'http://127.0.0.1:5501/sounds/snare.wav',
                sixtUrl: 'http://127.0.0.1:5501/sounds/tink.wav',
            }
        },
        {
            tempo: 100,
            iterations: 1,
            timeSignature: 4,
            sounds: {
                measUrl: 'http://127.0.0.1:5501/sounds/ride.wav',
                quarUrl: 'http://127.0.0.1:5501/sounds/boom.wav',
                eighUrl: 'http://127.0.0.1:5501/sounds/snare.wav',
                tripUrl: 'http://127.0.0.1:5501/sounds/tink.wav',
                sixtUrl: 'http://127.0.0.1:5501/sounds/hihat.wav',
            }
        },
        {
            tempo: 120,
            iterations: 1,
            timeSignature: 4,
            sounds: {
                measUrl: 'http://127.0.0.1:5501/sounds/snare.wav',
                quarUrl: 'http://127.0.0.1:5501/sounds/ride.wav',
                eighUrl: 'http://127.0.0.1:5501/sounds/kick.wav',
                tripUrl: 'http://127.0.0.1:5501/sounds/tink.wav',
                sixtUrl: 'http://127.0.0.1:5501/sounds/snare.wav',
            }
        },
    ]
}

const initialMethods = {
    startProgram: () => {}
}

const StateContext = createContext([{...initialState, ...initialMethods}, () => {}])

export const useStateContext = () => useContext(StateContext)

const reducer = (state, action) => {
    switch (action.type) {
        case "play":
            return {...state, isPlaying: true}
        case "stop":
            return {...state, isPlaying: false}
        case "tempo":
            return {...state, tempo: action.value}
        case "beatsPerMeasure":
            return {...state, beatsPerMeasure: action.value}
        case "mastVol":
            return {...state, mastVol: action.value}    
        case "measVol":
            return {...state, measVol: action.value}        
        case "quarVol":
            return {...state, quarVol: action.value}
        case "eighVol":
            return {...state, eighVol: action.value}
        case "tripVol":
            return {...state, tripVol: action.value}    
        case "sixtVol":
            return {...state, sixtVol: action.value}
        case "startProgram":
            return {...state, program: action.program}
        case "programMode":
            return {...state, programMode: !state.programMode}    
        default:
            return state
    }
}

export const ToneContext = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const measSound = useSound(state.measUrl)
    const quarSound = useSound(state.quarUrl)
    const eighSound = useSound(state.eighUrl)
    const tripSound = useSound(state.tripUrl)
    const sixtSound = useSound(state.sixtUrl)
    
    const measLoop = useLoop((time) => {
        measSound.start(time + ".2")
    },"1m")
    const quarLoop = useLoop((time) => {
        quarSound.start(time + ".2")
    },"4n").set({iterations: 2})
    const eighLoop = useLoop((time) => {
        eighSound.start(time + ".2")
    },"8n")
    const tripLoop = useLoop((time) => {
        tripSound.start(time + ".2")
    },"8t")
    const sixtLoop = useLoop((time) => {
        sixtSound.start(time + ".2")
    },"16n")
    
    useEffect(() => {
        Tone.Transport.bpm.value = state.tempo
        Tone.Transport.timeSignature = state.beatsPerMeasure
        Tone.Transport.lookAhead = 100

        if (state.isPlaying) {
            Tone.start()
            Tone.Transport.start() 
        }
        if (state.isPlaying && !state.programMode) {
            measSound.volume.value = state.measVol
            measLoop.start()
            quarSound.volume.value = state.quarVol
            quarLoop.start()
            eighSound.volume.value = state.eighVol
            eighLoop.start()
            tripSound.volume.value = state.tripVol
            tripLoop.start()
            sixtSound.volume.value = state.sixtVol
            sixtLoop.start()
        } else if (!state.programMode) {
            Tone.Transport.stop()
            measLoop.stop()
            quarLoop.stop()
            eighLoop.stop()
            tripLoop.stop()
            sixtLoop.stop()
        }

        if (state.measVol === -50) {
            measSound.mute = true
        } else {
            measSound.mute = false
        }
        if (state.quarVol === -50) {
            quarSound.mute = true
        } else {
            quarSound.mute = false
        }
        if (state.eighVol === -50) {
            eighSound.mute = true
        } else {
            eighSound.mute = false
        }
        if (state.tripVol === -50) {
            tripSound.mute = true
        } else {
            tripSound.mute = false
        }
        if (state.sixtVol === -50) {
            sixtSound.mute = true
        } else {
            sixtSound.mute = false
        }

    }, [
        state.tempo,
        state.isPlaying,
        state.beatsPerMeasure,
        measLoop,
        quarLoop,
        eighLoop,
        tripLoop,
        sixtLoop,
        measSound,
        quarSound,
        eighSound,
        tripSound,
        sixtSound,
        state.measVol,
        state.quarVol,
        state.eighVol,
        state.tripVol,
        state.sixtVol,
    ])

    useEffect(() => {
        if (state.isPlaying) {
            console.log('start')
            Tone.start()
            Tone.Transport.start()
            Tone.Transport.lookahead = 100
        } else {
            Tone.Transport.stop()
        }
        if (state.programMode) {
            let runningTotalLoops = 0
            const startMeasures = state.program.map(({loops}, i) => {
                return i === 0 ? 0 : runningTotalLoops + loops + i + "m"
            })

            console.log(startMeasures)

            const fullProgramInstruments = state.program.map((preset, i) => {
                console.log(Tone.Transport)
                Tone.Transport.schedule((time) => {
                  Tone.Transport.bpm.value = preset.tempo
                  Tone.Transport.timeSignature = preset.timeSignature  
                }, startMeasures[i])

                const measureSnare = new Tone.NoiseSynth({
                    volume: -10,
                    envelope: {
                        attack: 0.001,
                        decay: 0.2,
                        sustain: 0
                    }
                }).toDestination();
                const quarterKick = new Tone.MembraneSynth({
                    envelope: {
                        sustain: 0,
                        attack: 0.02,
                        decay: 0.8
                    },
                    octaves: 10,
                    pitchDecay: 0.01,
                }).toDestination()
                const eighthBell = new Tone.MetalSynth({
                    harmonicity: 12,
                    resonance: 800,
                    modulationIndex: 20,
                    envelope: {
                        decay: 0.4,
                    },
                    volume: -15
                }).toDestination();
                const tripletConga = new Tone.MembraneSynth({
                    pitchDecay: 0.008,
                    octaves: 2,
                    envelope: {
                        attack: 0.0006,
                        decay: 0.5,
                        sustain: 0
                    }
                }).toDestination();
                // const sixteenthHiHat = new Tone.Player(
                //     'http://127.0.0.1:5501/sounds/snare.wav'
                // ).toDestination()
                const measure = new Tone.Loop((time) => {
                    console.log(time)
                    measureSnare.triggerAttack(time + ".2")
                }, '1m')
                .set({
                    iterations: preset.iterations
                })
                const quarter = new Tone.Loop((time) => {
                    quarterKick.triggerAttackRelease("C2", "16n", time + ".2")
                }, '4n')
                .set({
                    iterations: preset.iterations * preset.timeSignature
                })
                const eighth = new Tone.Loop((time) => {
                    eighthBell.triggerAttack(time + ".2")
                }, '8n')
                .set({
                    iterations: preset.iterations * preset.timeSignature * 2
                })
                const triplet = new Tone.Loop((time) => {
                    tripletConga.triggerAttack(time + ".2")
                }, '8t')
                .set({
                    iterations: preset.iterations * preset.timeSignature * 3
                })
                // con sixteenth = new Tone.Loop((time) => {
                //     Tone.Transport.bpm.value = preset.tempo
                //     sixteenthHiHat.start(time)
                // }, '8n')
                // .set({
                //     iterations: preset.loops * state.beatsPerMeasure * 4
                // })
                // .start(startMeasures[i])
                return ([
                    measure.start(startMeasures[i]),
                    quarter.start(startMeasures[i]),
                    eighth.start(startMeasures[i]),
                    triplet.start(startMeasures[i]),
                ])
            })
            console.log(fullProgramInstruments)
        }        
    }, [
        state.isPlaying,
        state.program,
        state.programMode
    ])

    const methods = {
        startProgram: (program) => {},
      };

    return (
        <StateContext.Provider value={[{...state, ...methods}, dispatch]}>
            {children}
        </StateContext.Provider>
    )
}
