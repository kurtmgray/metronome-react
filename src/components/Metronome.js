import React from "react";
import { useStateContext } from "../ToneContext";
import CreatePreset from "./CreatePreset";

export default function Metronome() {
  const [state, dispatch] = useStateContext();

  return (
    <div>
      <div id="controls">
        <div id="tempoBox">
          Tempo:
          <span id="showTempo">{state.tempo}</span>
          BPM
          <input
            id="tempo"
            type="range"
            min={30.0}
            max={220.0}
            value={state.tempo}
            style={{ height: "20px", width: "200px" }}
            onChange={(e) =>
              dispatch({ type: "tempo", value: Number(e.target.value) })
            }
          />
        </div>
        <div>
          Beats Per Measure
          <span id="showBPM">{state.beatsPerMeasure}</span>
          <input
            id="bpm"
            type="range"
            min={1}
            max={6}
            value={state.beatsPerMeasure}
            style={{ height: "20px", width: "200px" }}
            onChange={(e) =>
              dispatch({
                type: "beatsPerMeasure",
                value: Number(e.target.value),
              })
            }
          />
        </div>
        <div>
          16th Volume
          <span id="sixtVol">{state.sixtVol}</span>
          <input
            id="bpm"
            type="range"
            min={-50}
            max={0}
            value={state.sixtVol}
            style={{ height: "20px", width: "200px" }}
            onChange={(e) =>
              dispatch({ type: "sixtVol", value: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label htmlFor="sixtSelect">16th Note Sound:</label>
          <select
            name="sixtSelect"
            id="sixtSelect"
            value={state.sixtUrl}
            onChange={(e) =>
              dispatch({ type: "sixtSound", value: e.target.value })
            }
            disabled={state.isPlaying}
          >
            <option value="">Choose a Sound</option>
            <option value="http://127.0.0.1:5501/sounds/boom.wav">Boom</option>
            <option value="http://127.0.0.1:5501/sounds/clap.wav">Clap</option>
            <option value="http://127.0.0.1:5501/sounds/hihat.wav">
              Hi-Hat
            </option>
            <option value="http://127.0.0.1:5501/sounds/kick.wav">Kick</option>
            <option value="http://127.0.0.1:5501/sounds/openhat.wav">
              Open Hi-Hat
            </option>
            <option value="http://127.0.0.1:5501/sounds/ride.wav">
              Ride Cymbal
            </option>
            <option value="http://127.0.0.1:5501/sounds/snare.wav">
              Snare
            </option>
            <option value="http://127.0.0.1:5501/sounds/tink.wav">
              Claves
            </option>
            <option value="http://127.0.0.1:5501/sounds/tom.wav">Tom</option>
          </select>
        </div>

        <div>
          8th Volume
          <span id="eighVol">{state.eighVol}</span>
          <input
            id="bpm"
            type="range"
            min={-50}
            max={0}
            value={state.eighVol}
            style={{ height: "20px", width: "200px" }}
            onChange={(e) =>
              dispatch({ type: "eighVol", value: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label htmlFor="eighSelect">8th Note Sound:</label>
          <select
            name="eighSelect"
            id="eighSelect"
            value={state.eighUrl}
            onChange={(e) =>
              dispatch({ type: "eighSound", value: e.target.value })
            }
            disabled={state.isPlaying}
          >
            <option value="">Choose a Sound</option>
            <option value="http://127.0.0.1:5501/sounds/boom.wav">Boom</option>
            <option value="http://127.0.0.1:5501/sounds/clap.wav">Clap</option>
            <option value="http://127.0.0.1:5501/sounds/hihat.wav">
              Hi-Hat
            </option>
            <option value="http://127.0.0.1:5501/sounds/kick.wav">Kick</option>
            <option value="http://127.0.0.1:5501/sounds/openhat.wav">
              Open Hi-Hat
            </option>
            <option value="http://127.0.0.1:5501/sounds/ride.wav">
              Ride Cymbal
            </option>
            <option value="http://127.0.0.1:5501/sounds/snare.wav">
              Snare
            </option>
            <option value="http://127.0.0.1:5501/sounds/tink.wav">
              Claves
            </option>
            <option value="http://127.0.0.1:5501/sounds/tom.wav">Tom</option>
          </select>
        </div>
        <div>
          Q Volume
          <span id="quarVol">{state.quarVol}</span>
          <input
            id="bpm"
            type="range"
            min={-50}
            max={0}
            value={state.quarVol}
            style={{ height: "20px", width: "200px" }}
            onChange={(e) =>
              dispatch({ type: "quarVol", value: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label htmlFor="quarSelect">Quarter Note Sound:</label>
          <select
            name="quarSelect"
            id="quarSelect"
            value={state.quarUrl}
            onChange={(e) =>
              dispatch({ type: "quarSound", value: e.target.value })
            }
            disabled={state.isPlaying}
          >
            <option value="">Choose a Sound</option>
            <option value="http://127.0.0.1:5501/sounds/boom.wav">Boom</option>
            <option value="http://127.0.0.1:5501/sounds/clap.wav">Clap</option>
            <option value="http://127.0.0.1:5501/sounds/hihat.wav">
              Hi-Hat
            </option>
            <option value="http://127.0.0.1:5501/sounds/kick.wav">Kick</option>
            <option value="http://127.0.0.1:5501/sounds/openhat.wav">
              Open Hi-Hat
            </option>
            <option value="http://127.0.0.1:5501/sounds/ride.wav">
              Ride Cymbal
            </option>
            <option value="http://127.0.0.1:5501/sounds/snare.wav">
              Snare
            </option>
            <option value="http://127.0.0.1:5501/sounds/tink.wav">
              Claves
            </option>
            <option value="http://127.0.0.1:5501/sounds/tom.wav">Tom</option>
          </select>
        </div>
        <div>
          Triplet Volume
          <span id="tripVol">{state.tripVol}</span>
          <input
            id="bpm"
            type="range"
            min={-50}
            max={0}
            value={state.tripVol}
            style={{ height: "20px", width: "200px" }}
            onChange={(e) =>
              dispatch({ type: "tripVol", value: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label htmlFor="tripSelect">Triplet Note Sound:</label>
          <select
            name="tripSelect"
            id="tripSelect"
            value={state.tripUrl}
            onChange={(e) =>
              dispatch({ type: "tripSound", value: e.target.value })
            }
            disabled={state.isPlaying}
          >
            <option value="">Choose a Sound</option>
            <option value="http://127.0.0.1:5501/sounds/boom.wav">Boom</option>
            <option value="http://127.0.0.1:5501/sounds/clap.wav">Clap</option>
            <option value="http://127.0.0.1:5501/sounds/hihat.wav">
              Hi-Hat
            </option>
            <option value="http://127.0.0.1:5501/sounds/kick.wav">Kick</option>
            <option value="http://127.0.0.1:5501/sounds/openhat.wav">
              Open Hi-Hat
            </option>
            <option value="http://127.0.0.1:5501/sounds/ride.wav">
              Ride Cymbal
            </option>
            <option value="http://127.0.0.1:5501/sounds/snare.wav">
              Snare
            </option>
            <option value="http://127.0.0.1:5501/sounds/tink.wav">
              Claves
            </option>
            <option value="http://127.0.0.1:5501/sounds/tom.wav">Tom</option>
          </select>
        </div>
        <div>
          Measure Volume
          <span id="measVol">{state.measVol}</span>
          <input
            id="bpm"
            type="range"
            min={-50}
            max={0}
            value={state.measVol}
            style={{ height: "20px", width: "200px" }}
            onChange={(e) =>
              dispatch({ type: "measVol", value: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <label htmlFor="measSelect">Measure Note Sound:</label>
          <select
            name="measSelect"
            id="measSelect"
            value={state.measUrl}
            onChange={(e) =>
              dispatch({ type: "measSound", value: e.target.value })
            }
            disabled={state.isPlaying}
          >
            <option value="">Choose a Sound</option>
            <option value="http://127.0.0.1:5501/sounds/boom.wav">Boom</option>
            <option value="http://127.0.0.1:5501/sounds/clap.wav">Clap</option>
            <option value="http://127.0.0.1:5501/sounds/hihat.wav">
              Hi-Hat
            </option>
            <option value="http://127.0.0.1:5501/sounds/kick.wav">Kick</option>
            <option value="http://127.0.0.1:5501/sounds/openhat.wav">
              Open Hi-Hat
            </option>
            <option value="http://127.0.0.1:5501/sounds/ride.wav">
              Ride Cymbal
            </option>
            <option value="http://127.0.0.1:5501/sounds/snare.wav">
              Snare
            </option>
            <option value="http://127.0.0.1:5501/sounds/tink.wav">
              Claves
            </option>
            <option value="http://127.0.0.1:5501/sounds/tom.wav">Tom</option>
          </select>
        </div>
        <div>
          <span id="beat">Beat 1</span>
        </div>
        <div>
          Master Volume
          <span id="mastVol">{state.mastVol}</span>
          <input
            id="bpm"
            type="range"
            min={-50}
            max={0}
            value={state.mastVol}
            style={{ height: "20px", width: "200px" }}
            onChange={(e) =>
              dispatch({ type: "mastVol", value: Number(e.target.value) })
            }
          />
        </div>
        <div>
          <button className="tap" onClick={() => dispatch({ type: "bpmTap" })}>
            Tap to Set Tempo
          </button>
          {!state.isPlaying && !state.programMode ? (
            <button
              id="play"
              className="play"
              onClick={() => {
                dispatch({ type: "play" });
              }}
            >
              Play
            </button>
          ) : null}
          {state.isPlaying && !state.programMode ? (
            <button
              id="play"
              className="play"
              onClick={() => {
                dispatch({ type: "stop" });
              }}
            >
              Stop
            </button>
          ) : null}
          <div>
            <button
              id="programMode"
              className="play"
              onClick={state.handleToggle}
            >
              View Programs
            </button>
            {state.programMode && !state.activeProgram ? (
              <button
                id="startProgram"
                className="start"
                onClick={state.startProgram}
                disabled={state.program}
              >
                Start Program
              </button>
            ) : null}
            {state.activeProgram && state.programMode ? (
              <button
                id="stopProgram"
                className="stop"
                onClick={state.stopProgram}
              >
                Stop Program
              </button>
            ) : null}
          </div>
        </div>
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
  );
}
