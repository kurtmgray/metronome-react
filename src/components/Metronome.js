import React from "react";
import { useStateContext } from "../ToneContext";
import sounds from "../Sounds";

export default function Metronome() {
  const [state, dispatch] = useStateContext();

  return (
    <div>
      <div className="controls" id="controls">
        <div className="mainDisplay">
          <div className="tempoDisplay">
            <h1>{state.tempo}</h1>
          </div>
          <div className="beatInfo">
            <div className="beatsPerDisplay">
              <h2>{state.beatsPerMeasure}</h2>
            </div>
            <div className="beatDisplay">
              <h2>{state.currentBeat}</h2>
            </div>
          </div>
        </div>
        <div id="tempoBox">
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
            <option value="">Choose a Sound</option>
            <option value={sounds.boom}>Boom</option>
            <option value={sounds.clap}>Clap</option>
            <option value={sounds.hihat}>Hi-Hat</option>
            <option value={sounds.kick}>Kick</option>
            <option value={sounds.openHihat}>Open Hi-Hat</option>
            <option value={sounds.ride}>Ride Cymbal</option>
            <option value={sounds.snare}>Snare</option>
            <option value={sounds.claves}>Claves</option>
            <option value={sounds.tom}>Tom</option>
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
            <option value="">Choose a Sound</option>
            <option value={sounds.boom}>Boom</option>
            <option value={sounds.clap}>Clap</option>
            <option value={sounds.hihat}>Hi-Hat</option>
            <option value={sounds.kick}>Kick</option>
            <option value={sounds.openHihat}>Open Hi-Hat</option>
            <option value={sounds.ride}>Ride Cymbal</option>
            <option value={sounds.snare}>Snare</option>
            <option value={sounds.claves}>Claves</option>
            <option value={sounds.tom}>Tom</option>
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
            <option value="">Choose a Sound</option>
            <option value={sounds.boom}>Boom</option>
            <option value={sounds.clap}>Clap</option>
            <option value={sounds.hihat}>Hi-Hat</option>
            <option value={sounds.kick}>Kick</option>
            <option value={sounds.openHihat}>Open Hi-Hat</option>
            <option value={sounds.ride}>Ride Cymbal</option>
            <option value={sounds.snare}>Snare</option>
            <option value={sounds.claves}>Claves</option>
            <option value={sounds.tom}>Tom</option>
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
            <option value="">Choose a Sound</option>
            <option value={sounds.boom}>Boom</option>
            <option value={sounds.clap}>Clap</option>
            <option value={sounds.hihat}>Hi-Hat</option>
            <option value={sounds.kick}>Kick</option>
            <option value={sounds.openHihat}>Open Hi-Hat</option>
            <option value={sounds.ride}>Ride Cymbal</option>
            <option value={sounds.snare}>Snare</option>
            <option value={sounds.claves}>Claves</option>
            <option value={sounds.tom}>Tom</option>
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
            <option value="">Choose a Sound</option>
            <option value={sounds.boom}>Boom</option>
            <option value={sounds.clap}>Clap</option>
            <option value={sounds.hihat}>Hi-Hat</option>
            <option value={sounds.kick}>Kick</option>
            <option value={sounds.openHihat}>Open Hi-Hat</option>
            <option value={sounds.ride}>Ride Cymbal</option>
            <option value={sounds.snare}>Snare</option>
            <option value={sounds.claves}>Claves</option>
            <option value={sounds.tom}>Tom</option>
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
      </div>
      <div className="metButtons">
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
      </div>
      <pre>
        App State:
        {JSON.stringify(state, null, "\t")}
      </pre>
    </div>
  );
}
