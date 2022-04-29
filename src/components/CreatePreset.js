import React, { useState } from 'react'
import  { useStateContext } from '../ToneContext'


export default function CreatePreset() {
    const [state, dispatch] = useStateContext()
  
    return (
    <div>
      <input
        type="text"
        value={state.tempPresetValues.title}
        onChange={e => dispatch({ type: 'presetTitle', value: e.target.value})}
      />
      <div id="tempoBox">Tempo: 
          <span id="showTempo">{state.tempPresetValues.tempo}</span>
          BPM 
          <input 
            id="tempo" 
            type="range" 
            min={30.0} 
            max={220.0} 
            value={state.tempPresetValues.tempo} 
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'presetTempo', value: Number(e.target.value)})}
          />
        </div>
        <div>Beats Per Measure
          <span id="showBPM">{state.tempPresetValues.timeSignature}</span>
          <input 
            id="bpm" 
            type="range" 
            min="1" 
            max="6" 
            value={state.tempPresetValues.timeSignature} 
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'presetBeatsPerMeasure', value: Number(e.target.value)})}
          />
        </div>
        <div>Number of Measures
          <input
            id="presetMeasures"
            type="number"
            value={state.tempPresetValues.iterations}
            onChange={e => dispatch({ type: 'presetIterations', value: Number(e.target.value)})}
          ></input>
        </div>

        <div>16th Volume
          <span id="sixtVol">{state.tempPresetValues.volume.sixt}</span>
          <input 
            id="bpm" 
            type="range" 
            min={-50} 
            max={0} 
            value={state.tempPresetValues.volume.sixt} 
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'sixtPresetVol', value: Number(e.target.value)})}
          />
        </div>
        <div>
          <label htmlFor="sixtPresetSelect">16th Note Sound:</label>
          <select
            name="sixtPresetSelect"
            id="sixtPresetSelect"
            value={state.tempPresetValues.sounds.sixt}
            onChange={e => dispatch({ type: 'sixtPresetSound', value: e.target.value})}
            
          >
            <option value=''>Choose a Sound</option>
            <option value='http://127.0.0.1:5501/sounds/boom.wav'>Boom</option>
            <option value='http://127.0.0.1:5501/sounds/clap.wav'>Clap</option>
            <option value='http://127.0.0.1:5501/sounds/hihat.wav'>Hi-Hat</option>
            <option value='http://127.0.0.1:5501/sounds/kick.wav'>Kick</option>
            <option value='http://127.0.0.1:5501/sounds/openhat.wav'>Open Hi-Hat</option>
            <option value='http://127.0.0.1:5501/sounds/ride.wav'>Ride Cymbal</option>
            <option value='http://127.0.0.1:5501/sounds/snare.wav'>Snare</option>
            <option value='http://127.0.0.1:5501/sounds/tink.wav'>Claves</option>
            <option value='http://127.0.0.1:5501/sounds/tom.wav'>Tom</option>
          </select>
        </div>

        <div>8th Volume
          <span id="eighVol">{state.tempPresetValues.volume.eigh}</span>
          <input 
            id="bpm" 
            type="range" 
              min={-50} 
              max={0} 
            value={state.tempPresetValues.volume.eigh} 
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'eighPresetVol', value: Number(e.target.value)})}
          />
        </div>
        <div>
          <label htmlFor="eighPresetSelect">8th Note Sound:</label>
          <select
            name="eighPresetSelect"
            id="eighPresetSelect"
            value={state.tempPresetValues.sounds.eigh}
            onChange={e => dispatch({ type: 'eighPresetSound', value: e.target.value})}
          >
            <option value=''>Choose a Sound</option>
            <option value='http://127.0.0.1:5501/sounds/boom.wav'>Boom</option>
            <option value='http://127.0.0.1:5501/sounds/clap.wav'>Clap</option>
            <option value='http://127.0.0.1:5501/sounds/hihat.wav'>Hi-Hat</option>
            <option value='http://127.0.0.1:5501/sounds/kick.wav'>Kick</option>
            <option value='http://127.0.0.1:5501/sounds/openhat.wav'>Open Hi-Hat</option>
            <option value='http://127.0.0.1:5501/sounds/ride.wav'>Ride Cymbal</option>
            <option value='http://127.0.0.1:5501/sounds/snare.wav'>Snare</option>
            <option value='http://127.0.0.1:5501/sounds/tink.wav'>Claves</option>
            <option value='http://127.0.0.1:5501/sounds/tom.wav'>Tom</option>
          </select>
        </div>
        <div>Q Volume
          <span id="quarVol">{state.tempPresetValues.volume.quar}</span>
          <input 
            id="bpm" 
            type="range" 
            min={-50} 
            max={0} 
            value={state.tempPresetValues.volume.quar} 
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'quarPresetVol', value: Number(e.target.value)})}
          />
        </div>
        <div>
          <label htmlFor="quarPresetSelect">Quarter Note Sound:</label>
          <select
            name="quarPresetSelect"
            id="quarPresetSelect"
            value={state.tempPresetValues.sounds.quar}
            onChange={e => dispatch({ type: 'quarPresetSound', value: e.target.value})}
          >
            <option value=''>Choose a Sound</option>
            <option value='http://127.0.0.1:5501/sounds/boom.wav'>Boom</option>
            <option value='http://127.0.0.1:5501/sounds/clap.wav'>Clap</option>
            <option value='http://127.0.0.1:5501/sounds/hihat.wav'>Hi-Hat</option>
            <option value='http://127.0.0.1:5501/sounds/kick.wav'>Kick</option>
            <option value='http://127.0.0.1:5501/sounds/openhat.wav'>Open Hi-Hat</option>
            <option value='http://127.0.0.1:5501/sounds/ride.wav'>Ride Cymbal</option>
            <option value='http://127.0.0.1:5501/sounds/snare.wav'>Snare</option>
            <option value='http://127.0.0.1:5501/sounds/tink.wav'>Claves</option>
            <option value='http://127.0.0.1:5501/sounds/tom.wav'>Tom</option>
          </select>
        </div>
        <div>Triplet Volume
          <span id="tripVol">{state.tempPresetValues.volume.trip}</span>
          <input 
            id="bpm" 
            type="range" 
            min={-50} 
            max={0} 
            value={state.tempPresetValues.volume.trip}
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'tripPresetVol', value: Number(e.target.value)})}
          />
        </div>
        <div>
          <label htmlFor="tripPresetSelect">Triplet Note Sound:</label>
          <select
            name="tripPresetSelect"
            id="tripPresetSelect"
            value={state.tempPresetValues.sounds.trip}
            onChange={e => dispatch({ type: 'tripPresetSound', value: e.target.value})}
          >
            <option value=''>Choose a Sound</option>
            <option value='http://127.0.0.1:5501/sounds/boom.wav'>Boom</option>
            <option value='http://127.0.0.1:5501/sounds/clap.wav'>Clap</option>
            <option value='http://127.0.0.1:5501/sounds/hihat.wav'>Hi-Hat</option>
            <option value='http://127.0.0.1:5501/sounds/kick.wav'>Kick</option>
            <option value='http://127.0.0.1:5501/sounds/openhat.wav'>Open Hi-Hat</option>
            <option value='http://127.0.0.1:5501/sounds/ride.wav'>Ride Cymbal</option>
            <option value='http://127.0.0.1:5501/sounds/snare.wav'>Snare</option>
            <option value='http://127.0.0.1:5501/sounds/tink.wav'>Claves</option>
            <option value='http://127.0.0.1:5501/sounds/tom.wav'>Tom</option>
          </select>
        </div>
        <div>Measure Volume
          <span id="measVol">{state.tempPresetValues.volume.meas}</span>
          <input 
            id="bpm" 
            type="range" 
            min={-50} 
            max={0} 
            value={state.tempPresetValues.volume.meas}
            style={{height: '20px', width: '200px'}} 
            onChange={e => dispatch({ type: 'measPresetVol', value: Number(e.target.value)})}
          />
        </div>
        <div>
          <label htmlFor="measPresetSelect">Measure Note Sound:</label>
          <select
            name="measPresetSelect"
            id="measPresetSelect"
            value={state.tempPresetValues.sounds.meas}
            onChange={e => dispatch({ type: 'measPresetSound', value: e.target.value})}
          >
            <option value=''>Choose a Sound</option>
            <option value='http://127.0.0.1:5501/sounds/boom.wav'>Boom</option>
            <option value='http://127.0.0.1:5501/sounds/clap.wav'>Clap</option>
            <option value='http://127.0.0.1:5501/sounds/hihat.wav'>Hi-Hat</option>
            <option value='http://127.0.0.1:5501/sounds/kick.wav'>Kick</option>
            <option value='http://127.0.0.1:5501/sounds/openhat.wav'>Open Hi-Hat</option>
            <option value='http://127.0.0.1:5501/sounds/ride.wav'>Ride Cymbal</option>
            <option value='http://127.0.0.1:5501/sounds/snare.wav'>Snare</option>
            <option value='http://127.0.0.1:5501/sounds/tink.wav'>Claves</option>
            <option value='http://127.0.0.1:5501/sounds/tom.wav'>Tom</option>
          </select>
        </div>
        <div>
          <span id="beat">Beat 1</span>
        </div>
        {/* <div>Master Volume
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
        </div> */}
        <button
          id={state.activeProgram.id}
          onClick={state.handleSavePreset}
          disabled={!state.activeProgram}
        >
            Save Preset to Current Program
        </button> 
        <button
            onClick={state.handleCancelNewPreset}
            disabled={!state.createPresetMode}
        >
            Cancel
        </button>
        <pre>
          App State:
          {JSON.stringify(state, null, "\t")}
        </pre>
    </div>
  )
}
