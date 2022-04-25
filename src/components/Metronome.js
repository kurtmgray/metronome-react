import React from 'react'
import  { useStateContext } from '../ToneContext'

export default function Metronome() {
    const [state, dispatch] = useStateContext()

    return (
    <div>
      <div id="controls">
        <div>
          {!state.isPlaying ? (
            <button 
              id="play" 
              className="play" 
              onClick={() => {dispatch({ type: 'play'})}}
            >
              Play
            </button>
          ) : (
            <button 
              id="play" 
              className="play" 
              onClick={() => {dispatch({ type: 'stop'})}}
            >
              Stop
            </button>
          )}
          <button 
              id="programMode" 
              className="play" 
              onClick={() => {dispatch({ type: 'programMode'})}}
            >
              Toggle Program Mode 
            </button>
        </div>
        <div id="tempoBox">Tempo: 
          <span id="showTempo">{state.tempo}</span>
          BPM 
          <input 
            id="tempo" 
            type="range" 
            min={30.0} 
            max={220.0} 
            value={state.tempo} 
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'tempo', value: Number(e.target.value)})}
          />
        </div>
        <div>Beats Per Measure
          <span id="showBPM">{state.beatsPerMeasure}</span>
          <input 
            id="bpm" 
            type="range" 
            min={1} 
            max={6} 
            value={state.beatsPerMeasure} 
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'beatsPerMeasure', value: Number(e.target.value)})}
          />
        </div>
        <div>16th Volume
          <span id="sixtVol">{state.sixtVol}</span>
          <input 
            id="bpm" 
            type="range" 
            min={-50} 
            max={0} 
            value={state.sixtVol} 
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'sixtVol', value: Number(e.target.value)})}
          />
        </div>
        <div>8th Volume
          <span id="eighVol">{state.eighVol}</span>
          <input 
            id="bpm" 
            type="range" 
              min={-50} 
              max={0} 
            value={state.eighVol} 
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'eighVol', value: Number(e.target.value)})}
          />
        </div>
        <div>Q Volume
          <span id="quarVol">{state.quarVol}</span>
          <input 
            id="bpm" 
            type="range" 
            min={-50} 
            max={0} 
            value={state.quarVol} 
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'quarVol', value: Number(e.target.value)})}
          />
        </div>
        <div>Triplet Volume
          <span id="tripVol">{state.tripVol}</span>
          <input 
            id="bpm" 
            type="range" 
            min={-50} 
            max={0} 
            value={state.tripVol}
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'tripVol', value: Number(e.target.value)})}
          />
        </div>
        <div>Measure Volume
          <span id="measVol">{state.measVol}</span>
          <input 
            id="bpm" 
            type="range" 
            min={-50} 
            max={0} 
            value={state.measVol}
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'measVol', value: Number(e.target.value)})}
          />
        </div>
        <div>
          <span id="beat">Beat 1</span>
        </div>
        <div>Master Volume
          <span id="mastVol">{state.mastVol}</span>
          <input 
            id="bpm" 
            type="range" 
            min={-50} 
            max={0} 
            value={state.mastVol}
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'mastVol', value: Number(e.target.value)})}
          />
        </div>
        {/* <div>
          <button 
            className="tap" 
            onClick={handleTap}>Tap to Set Tempo</button>
        </div> */}
        {/* <div>
          <label htmlFor="preset-bars">Number of Bars in Preset</label>
          <span id="preset-bars">{maxPresetBars}</span>
          <input 
            name="preset-bars"
            type="number"
            onChange=
              "maxPresetBars = event.target.value;
              document.getElementById('preset-bars').innerText = maxPresetBars;
              console.log(maxPresetBars)"
          >

        </div>
        <div>
          {/* <!-- <button onClick="savePresets()">Save Preset to Program</button> --> */}
          {/* <button onClick={toggleProgramMode}>Toggle Program Mode</button>
          <span id="program-toggle"></span>
        </div>
          <div className='preset-info'>
          <span id="preset-bar">{presetBar}</span>
          <span id="preset-number">{preset}</span>
        </div>   */}
        <pre>
        App State:
        {JSON.stringify(state, null, "\t")}
      </pre>
      </div>
    </div>
  )
}
