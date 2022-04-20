import React, { useState, useEffect, useRef, useContext } from 'react'
import WorkerBuilder from './WorkerBuilder'
import MetronomeWorker from './MetronomeWorker'
import { AudContext } from '../AudContext'

export default function Metronome() {
    const {audioContext, setAudioContext} = useContext(AudContext)
    
    // const [timerWorker, setTimerWorker] = useState(new WorkerBuilder(MetronomeWorker))
    const [preset, setPreset] = useState(0)
    const [presetBar, setPresetBar] = useState(0)
    const [maxPresetBars, setMaxPresetBars] = useState(null)
    const [unlocked, setUnlocked] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentSubdivision, setCurrentSubdivision] = useState(null)
    const [beat, setBeat] = useState(0)
    const [beatsPerMeasure, setBeatsPerMeasure] = useState(4)
    const [tempo, setTempo] = useState(120)
    const [lookahead, setLookahead] = useState(25)
    const [programMode, setProgramMode] = useState(false)
    const [scheduleAheadTime, setScheduleAheadTime] = useState(0.1)
    const [noteTime, setNoteTime] = useState()
    const [lastClick, setLastClick] = useState()
    const [secondToLastClick, setSecondToLastClick] = useState()
    // const [gainNode, setGainNode] = useState(null)
    // const [accentGainNode, setAccentGainNode] = useState(null)
    const [buffers, setBuffers] = useState({})
    const [gainValues, setGainValues] = useState({
        sixtGain: 0,
        eighGain: 0,
        quarGain: 1,
        tripGain: 0,
        measGain: 1,
        mastGain: 0
    })
    const [soundUrls, setSoundUrls] = useState({
        meas: 'http://127.0.0.1:5501/sounds/clap.wav',
        quar: 'http://127.0.0.1:5501/sounds/kick.wav',
        eigh: 'http://127.0.0.1:5501/sounds/ride.wav',
        trip: 'http://127.0.0.1:5501/sounds/snare.wav',
        sixt: 'http://127.0.0.1:5501/sounds/tink.wav'
    })

    // const audioContext = useRef(null)
    const [tick, setTick] = useState(null)
    const timerWorker = useRef(null)
    // const noteTime = useRef(null)
    const gainNode = useRef(null)
    const accentGainNode = useRef(null)
    // const isMounted = useRef(null)

    // let buffers = {
    //     measBuffer: null,
    //     quarBuffer: null, 
    //     eighBuffer: null,
    //     tripBuffer: null,
    //     sixtBuffer: null
    // }    
    const program = [
        {
            tempo: 160,
            sixtGain: 0, 
            eighGain: 0,
            tripGain: 1,
            quarGain: 1,
            measGain: 1,
            mastGain: 1,
            maxPresetBars: 3,
            beatsPerMeasure: 5,
            measSound: 'sounds/boom.wav',
            quarSound: 'sounds/kick.wav',
            eighSound: 'sounds/tink.wav',
            tripSound: 'sounds/hihat.wav',
            sixtSound: 'sounds/ride.wav'
        },
        {
            tempo: 100,
            sixtGain: 1, 
            eighGain: 1,
            tripGain: 0,
            quarGain: 1,
            measGain: 1,
            mastGain: 1,
            maxPresetBars: 2,
            beatsPerMeasure: 3,
            measSound: 'sounds/kick.wav',
            quarSound: 'sounds/snare.wav',
            eighSound: 'sounds/hihat.wav',
            tripSound: 'sounds/tink.wav',
            sixtSound: 'sounds/openhat.wav'
        },
        {
            tempo: 80,
            sixtGain: 0, 
            eighGain: 0,
            tripGain: 0,
            quarGain: 1,
            measGain: 1,
            mastGain: 1,
            maxPresetBars: 3,
            beatsPerMeasure: 2,
            measSound: 'sounds/ride.wav',
            quarSound: 'sounds/tink.wav',
            eighSound: 'sounds/kick.wav',
            tripSound: 'sounds/ride.wav',
            sixtSound: 'sounds/hihat.wav'
        },
    ]
    const toggleProgramMode = () => {
        setProgramMode(oldPM => !oldPM)
        console.log(programMode)
    }

    const loadSound = async (url) => {
        let response = await fetch(url)
        const arrayBuffer = await response.arrayBuffer()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
        return audioBuffer
    }
    const setupSounds = async (urls) => {
        const loadedBuffers = {
            measBuffer: await loadSound(urls.meas),
            quarBuffer: await loadSound(urls.quar),
            eighBuffer: await loadSound(urls.eigh),
            tripBuffer: await loadSound(urls.trip),
            sixtBuffer: await loadSound(urls.sixt)
        }
        setBuffers(loadedBuffers)
    }    
    const playSound = (buffer, time) => {
        const soundSource = audioContext.createBufferSource()
        soundSource.buffer = buffer
        soundSource.connect(gainNode)
        soundSource.start(time)
        return soundSource
    }
    
    const playAccent = (buffer, time) => {
        const accentSource = audioContext.createBufferSource()
        accentSource.buffer = buffer
        console.log(accentSource)
        console.log(gainNode)
        accentSource.connect(gainNode)
        accentSource.start(time)
        return accentSource
    }

    const nextLoop = (next) => {
        setPresetBar(0)
        setTempo(next.tempo)
        setGainValues({
            sixtGain: next.sixtGain, 
            eighGain: next.eighGain,
            tripGain: next.tripGain,
            quarGain: next.quarGain,
            measGain: next.measGain,
            mastGain: next.mastGain
        })
        setSoundUrls({
            meas: next.measSound,
            quar: next.quarSound,
            eigh: next.eighSound,
            trip: next.tripSound,
            sixt: next.sixtSound
        })
        setMaxPresetBars(next.maxPresetBars)
    }

    const stopProgram = () => {
        timerWorker.current.postMessage("stop");
        // isPlaying = !isPlaying
        setIsPlaying(oldIP => !oldIP)
        // document.getElementById('beat').innerText = 1
        // document.getElementById('play').innerText = 'Play'
    }

    const handleTap = () => {
        const timeNow = new Date().getTime()
        if (secondToLastClick) {
            const difference = (timeNow - secondToLastClick) / 2
            let tmp = Math.floor(60000 / difference)
            if (tmp > 250){
                tmp = 250
            }
            if (tmp < 30) {
                tmp = 30
            }
            setTempo(tmp) 
        } 
        setSecondToLastClick(lastClick)
        setLastClick(timeNow)
        
        return tempo
    }

    const volume = (value) => {
        return (gainValues.mastGain + 1) * value
    }

    useEffect(() => {
        const init = () => {
            // audioContext = new AudioContext()
        
            setupSounds(soundUrls)      //setup default sounds
    
            timerWorker.current = new WorkerBuilder(MetronomeWorker)
            timerWorker.current.onmessage = function(e) {
            if (e.data === "tick") {
                let count = 0
                count++
                setTick(count)
                console.log("tick!");
            }
            else
                console.log("message: " + e.data);
        };
        timerWorker.current.postMessage({"interval":lookahead});
        }
        init() 
        console.log(audioContext)       
    }, [])

    useEffect(() => {
        const play = () => {
            setLastClick(null)
            setBeat(1)
            console.log(audioContext)
            if (!unlocked) {
              // play silent buffer to unlock the audio
              let buffer = audioContext.createBuffer(1, 1, 22050);
              let node = audioContext.createBufferSource();
              node.buffer = buffer;
              node.start(0);
              setUnlocked(true);
            }
            console.log(isPlaying)
            if (isPlaying) { 
                if (programMode) {
                    nextLoop(program[preset])
                    setupSounds(soundUrls)
                    setPreset(oldPreset => oldPreset++)
                }
                setCurrentSubdivision(0)
                setNoteTime(audioContext.currentTime + .05)
                // noteTime = audioContext.currentTime + .05
                console.log(noteTime)
                console.log(audioContext)
                timerWorker.current.postMessage("start"); 
            } else {
                setPreset(0)
                // document.getElementById('beat').innerText = 1
                timerWorker.current.postMessage("stop");;
            }
        }
        play()

    }, [isPlaying])

    useEffect(() => {
        console.log(tick)
        const scheduleNote = ( time ) => {
            accentGainNode.current = audioContext.createGain()
            accentGainNode.current.connect(audioContext.destination)
            gainNode.current = audioContext.createGain()
            gainNode.current.connect(audioContext.destination)          
            
            if (currentSubdivision % (beatsPerMeasure * 12) === 0) {
                if (gainValues.measGain > 0) {
                    playAccent(buffers.measBuffer, time)
                    accentGainNode.current.gain.value = volume(gainValues.measGain)    
                } 
            }
            if (currentSubdivision % 12 === 0) {
                playSound(buffers.quarBuffer, time)
                gainNode.current.gain.value = volume(gainValues.quarGain)
            } 
            else if (currentSubdivision % 6 === 0) {
                playSound(buffers.eighBuffer, time)
                gainNode.current.gain.value = volume(gainValues.eighGain)
            }
            else if (currentSubdivision % 4 === 0) {
                playSound(buffers.tripBuffer, time)
                gainNode.current.gain.value = volume(gainValues.tripGain)
            }
            else if (currentSubdivision % 3 === 0) {
                playSound(buffers.sixtBuffer, time)
                gainNode.current.gain.value = volume(gainValues.sixtGain)
            } else {
                gainNode.current.gain.value = 0                             // mute all other 12let notes
            }
                                                                    // use 8 for HNT and 2 for TS
        }
        const nextNote = () => {
            const secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT tempo value to calculate beat length.
                                                    // secondsPerBeat converts tempo into seconds
            setNoteTime(oldNT => oldNT += (1/12) * secondsPerBeat);    // beats subdivided into 12 parts to cover 16th, triplets, 8ths   
                                                    // define time at which next note should play
            // noteTime += (1/12) * secondsPerBeat
            setCurrentSubdivision(oldCS => oldCS++)
            
            if (currentSubdivision >= beatsPerMeasure * 12 || currentSubdivision === 0) {
                console.log('measure')
                setCurrentSubdivision(0)
                setBeat(0)                                    // reset at measure line for display
                if (programMode) {
                    setPresetBar(oldPB => oldPB++)
                    if (presetBar === maxPresetBars && program[preset]) {    
                        nextLoop(program[preset])
                        setupSounds(soundUrls)
                        setPresetBar(0)                       // reset presetBar for next loop
                        setPreset(oldPreset => oldPreset++)
                    }
                    if (presetBar === maxPresetBars && preset === program.length) {
                        stopProgram()
                        setPresetBar(0)                       // reset presetBar for next loop
                        setPreset(0)
                    }
                }
            }
            if (currentSubdivision % 12 === 0) {
                setBeat(oldBeat => oldBeat++)  
            }                                        
            // document.getElementById('beat').innerText = 'Beat ' + beat
            // document.getElementById('preset-bars').innerText = maxPresetBars
            // document.getElementById('preset-bar').innerText = 'Preset Bar ' + (presetBar + 1)
            // document.getElementById('preset-number').innerText = 'Preset Number ' + (preset)
        }
        const scheduler = () => {
            console.log(audioContext)
            console.log(noteTime) 
            if (noteTime < audioContext.currentTime + scheduleAheadTime) {
                scheduleNote(noteTime);
                nextNote();
            }
        }
        scheduler()
    }, [tick])

    // useEffect(() => {
    //     scheduler()
    // }, [noteTime])
    







    return (
    <div>
    <div id="controls">
      <div>
        <button 
          id="play"
          className="play" 
          onClick={() => {setIsPlaying(oldIP => !oldIP)}}
        >
        {isPlaying ? "Stop" : "Play"}
        </button>
      </div>
      <div id="tempoBox">Tempo: 
        <span id="showTempo">{tempo}</span>
        BPM 
        <input 
          id="tempo" 
          type="range" 
          min="30.0" 
          max="220.0" 
          step="1" 
          value={tempo} 
          style={{height: '20px', width: '200px'}} 
          onChange={event => setTempo(event.target.value)}
        />
      </div>
      <div>Beats Per Measure
        <span id="showBPM">{beatsPerMeasure}</span>
        <input 
          id="bpm" 
          type="range" 
          min="1" 
          max="6" 
          step="1" 
          value={beatsPerMeasure} 
          style={{height: '20px', width: '200px'}} 
          onChange={event => {setBeatsPerMeasure(event.target.value)}}
        />
      </div>
      <div>16th Volume
        <span id="sixtGain">{gainValues.sixtGain}</span>
        <input 
          id="bpm" 
          type="range" 
          min="0" 
          max="1" 
          step=".1" 
          value={gainValues.sixtGain} 
          style={{height: '20px', width: '200px'}} 
          onChange={event => {setGainValues({sixtGain: event.target.value})}}
        />
      </div>
      <div>8th Volume
        <span id="eighGain">{gainValues.eighGain}</span>
        <input 
          id="bpm" 
          type="range" 
          min="0" 
          max="1" 
          step=".1" 
          value={gainValues.eighGain} 
          style={{height: '20px', width: '200px'}} 
          onChange={event => {setGainValues({eighGain: event.target.value})}}
        />
      </div>
      <div>Q Volume
        <span id="quarGain">{gainValues.quarGain}</span>
        <input 
          id="bpm" 
          type="range" 
          min="0" 
          max="1" 
          step=".1" 
          value={gainValues.quarGain} 
          style={{height: '20px', width: '200px'}} 
          onChange={event => {setGainValues({quarGain: event.target.value})}}
        />
      </div>
      <div>Triplet Volume
        <span id="tripGain">{gainValues.tripGain}</span>
        <input 
          id="bpm" 
          type="range" 
          min="0" 
          max="1" 
          step=".1" 
          value={gainValues.tripGain}
          style={{height: '20px', width: '200px'}} 
          onChange={event => {setGainValues({tripGain: event.target.value})}}
        />
      </div>
      <div>Measure Volume
        <span id="measGain">{gainValues.measGain}</span>
        <input 
          id="bpm" 
          type="range" 
          min="0" 
          max="1" 
          step=".1" 
          value={gainValues.measGain}
          style={{height: '20px', width: '200px'}} 
          onChange={event => {setGainValues({measGain: event.target.value})}}
        />
      </div>
      <div>
        <span id="beat">Beat 1</span>
      </div>
      <div>Master Volume
        <span id="mastGain">{gainValues.mastGain}</span>
        <input 
          id="bpm" 
          type="range" 
          min="0" 
          max="1" 
          step=".1" 
          value={gainValues.mastGain}
          style={{height: '20px', width: '200px'}} 
          onChange={event => {setGainValues({mastGain: event.target.value})}}
        />
      </div>
      <div>
        <button 
          className="tap" 
          onClick={handleTap}>Tap to Set Tempo</button>
      </div>
      <div>
        <label htmlFor="preset-bars">Number of Bars in Preset</label>
        <span id="preset-bars">{maxPresetBars}</span>
        {/* <!-- <input 
          name="preset-bars"
          type="number"
          onChange=
            "maxPresetBars = event.target.value;
            document.getElementById('preset-bars').innerText = maxPresetBars;
            console.log(maxPresetBars)"
        > --> */}
      </div>
      <div>
        {/* <!-- <button onClick="savePresets()">Save Preset to Program</button> --> */}
        <button onClick={toggleProgramMode}>Toggle Program Mode</button>
        <span id="program-toggle"></span>
      </div>
        <div className='preset-info'>
        <span id="preset-bar">{presetBar}</span>
        <span id="preset-number">{preset}</span>
      </div>  
    </div>
    </div>
  )
}
