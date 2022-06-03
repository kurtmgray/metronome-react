import React from "react";
import { useStateContext } from "../ToneContext";
import sounds from "./Sounds";

export default function PresetDetails() {
  const [state, dispatch] = useStateContext();

  return (
    <div className="preset">
      <div className="presetHeader">
        <input
          className="presetTitle"
          type="text"
          placeholder="Enter preset title"
          maxLength="8"
          value={
            state.activePresetId
              ? state.getPresetValue("title")
              : state.tempPresetValues.title
          }
          onChange={(e) =>
            dispatch({
              type: "updatePresetTitle",
              value: e.target.value,
            })
          }
        />
        <div className="tempo">
          <p className="tempoEdit">
            {state.activePresetId
              ? state.getPresetValue("tempo")
              : state.tempPresetValues.tempo}{" "}
            bpm
          </p>
          <input
            className="tempoSlider"
            id="tempo"
            type="range"
            min={30.0}
            max={220.0}
            value={
              state.activePresetId
                ? state.getPresetValue("tempo")
                : state.tempPresetValues.tempo
            }
            style={{ height: "20px", width: "200px" }}
            onChange={(e) =>
              dispatch({ type: "presetTempo", value: Number(e.target.value) })
            }
          />
        </div>
        <div className="signature">
          <p>
            Time
            {/* <span id="showBPM">
            {state.activePresetId
              ? state.getPresetValue("timeSignature")
              : state.tempPresetValues.timeSignature}
          </span> */}
          </p>
          <input
            id="bpm"
            type="number"
            min="1"
            max="6"
            value={
              state.activePresetId
                ? state.getPresetValue("timeSignature")
                : state.tempPresetValues.timeSignature
            }
            style={{ height: "20px", width: "40px" }}
            onChange={(e) =>
              dispatch({
                type: "presetBeatsPerMeasure",
                value: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="measures">
          <p>Measures</p>
          <input
            id="presetMeasures"
            type="number"
            value={
              state.activePresetId
                ? state.getPresetValue("iterations")
                : state.tempPresetValues.iterations
            }
            style={{ height: "20px", width: "40px" }}
            onChange={(e) =>
              dispatch({
                type: "presetIterations",
                value: Number(e.target.value),
              })
            }
          ></input>
        </div>
      </div>
      <div className="soundControlContainer">
        <div className="soundControl">
          <div className="verticalRange">
            <input
              className="metSlider"
              id="bpm"
              type="range"
              min={-50}
              max={0}
              value={
                state.activePresetId
                  ? state.getNestedPresetValue("volume", "sixt")
                  : state.tempPresetValues.volume.sixt
              }
              onChange={(e) =>
                dispatch({
                  type: "sixtPresetVol",
                  value: Number(e.target.value),
                })
              }
            />
          </div>
          <span id="sixtVol">
            {state.activePresetId
              ? state.getNestedPresetValue("volume", "sixt")
              : state.tempPresetValues.volume.sixt}{" "}
            db
          </span>
          <div>
            <select
              name="sixtPresetSelect"
              id="sixtPresetSelect"
              defaultValue={
                state.activePresetId
                  ? state.getNestedPresetValue("sounds", "sixt")
                  : state.tempPresetValues.sounds.sixt
              }
              onChange={(e) =>
                dispatch({ type: "sixtPresetSound", value: e.target.value })
              }
            >
              <option value="">Choose a Sound</option>
              <optgroup label="DigiMet">
                <option value={sounds.digital.down}>Down</option>
                <option value={sounds.digital.up}>Up</option>
                <option value={sounds.digital.tap}>Tap</option>
              </optgroup>
              <optgroup label="Drum Kit">
                <option value={sounds.drumkit.boom}>Boom</option>
                <option value={sounds.drumkit.hihat}>Hi-Hat</option>
                <option value={sounds.drumkit.kick}>Kick</option>
                <option value={sounds.drumkit.openHihat}>Open Hi-Hat</option>
                <option value={sounds.drumkit.ride}>Ride Cymbal</option>
                <option value={sounds.drumkit.snare}>Snare</option>
                <option value={sounds.drumkit.tom}>Tom</option>
              </optgroup>
              <optgroup label="Electro Drum">
                <option value={sounds.electrodrum.eHiHat}>Hi-Hat</option>
                <option value={sounds.electrodrum.eKick}>Kick</option>
                <option value={sounds.electrodrum.eSnare}>Snare</option>
              </optgroup>
              <optgroup label="Tabla">
                <option value={sounds.tabla.dha}>Dha</option>
                <option value={sounds.tabla.dhin}>Dhin</option>
                <option value={sounds.tabla.tin}>Tin</option>
              </optgroup>
              <optgroup label="Yamaha">
                <option value={sounds.yamaha.yCowbell}>Cowbell</option>
                <option value={sounds.yamaha.yKick}>Kick</option>
                <option value={sounds.yamaha.yRide}>Ride</option>
                <option value={sounds.yamaha.yRim}>Rim</option>
                <option value={sounds.yamaha.yShaker}>Shaker</option>
              </optgroup>
            </select>
          </div>
          <label htmlFor="sixtPresetSelect">Sixteenth</label>
        </div>
        <div className="soundControl">
          <div className="verticalRange">
            <input
              className="metSlider"
              id="bpm"
              type="range"
              min={-50}
              max={0}
              value={
                state.activePresetId
                  ? state.getNestedPresetValue("volume", "eigh")
                  : state.tempPresetValues.volume.eigh
              }
              onChange={(e) =>
                dispatch({
                  type: "eighPresetVol",
                  value: Number(e.target.value),
                })
              }
            />
          </div>
          <span id="eighVol">
            {state.activePresetId
              ? state.getNestedPresetValue("volume", "eigh")
              : state.tempPresetValues.volume.eigh}{" "}
            db
          </span>
          <div>
            <select
              name="eighPresetSelect"
              id="eighPresetSelect"
              defaultValue={
                state.activePresetId
                  ? state.getNestedPresetValue("sounds", "eigh")
                  : state.tempPresetValues.sounds.eigh
              }
              onChange={(e) =>
                dispatch({ type: "eighPresetSound", value: e.target.value })
              }
            >
              <option value="">Choose a Sound</option>
              <optgroup label="DigiMet">
                <option value={sounds.digital.down}>Down</option>
                <option value={sounds.digital.up}>Up</option>
                <option value={sounds.digital.tap}>Tap</option>
              </optgroup>
              <optgroup label="Drum Kit">
                <option value={sounds.drumkit.boom}>Boom</option>
                <option value={sounds.drumkit.hihat}>Hi-Hat</option>
                <option value={sounds.drumkit.kick}>Kick</option>
                <option value={sounds.drumkit.openHihat}>Open Hi-Hat</option>
                <option value={sounds.drumkit.ride}>Ride Cymbal</option>
                <option value={sounds.drumkit.snare}>Snare</option>
                <option value={sounds.drumkit.tom}>Tom</option>
              </optgroup>
              <optgroup label="Electro Drum">
                <option value={sounds.electrodrum.eHiHat}>Hi-Hat</option>
                <option value={sounds.electrodrum.eKick}>Kick</option>
                <option value={sounds.electrodrum.eSnare}>Snare</option>
              </optgroup>
              <optgroup label="Tabla">
                <option value={sounds.tabla.dha}>Dha</option>
                <option value={sounds.tabla.dhin}>Dhin</option>
                <option value={sounds.tabla.tin}>Tin</option>
              </optgroup>
              <optgroup label="Yamaha">
                <option value={sounds.yamaha.yCowbell}>Cowbell</option>
                <option value={sounds.yamaha.yKick}>Kick</option>
                <option value={sounds.yamaha.yRide}>Ride</option>
                <option value={sounds.yamaha.yRim}>Rim</option>
                <option value={sounds.yamaha.yShaker}>Shaker</option>
              </optgroup>
            </select>
          </div>
          <label htmlFor="eighPresetSelect">Eighth</label>
        </div>
        <div className="soundControl">
          <div className="verticalRange">
            <input
              className="metSlider"
              id="bpm"
              type="range"
              min={-50}
              max={0}
              value={
                state.activePresetId
                  ? state.getNestedPresetValue("volume", "quar")
                  : state.tempPresetValues.volume.quar
              }
              onChange={(e) =>
                dispatch({
                  type: "quarPresetVol",
                  value: Number(e.target.value),
                })
              }
            />
          </div>
          <span id="quarVol">
            {state.activePresetId
              ? state.getNestedPresetValue("volume", "quar")
              : state.tempPresetValues.volume.quar}{" "}
            db
          </span>
          <div>
            <select
              name="quarPresetSelect"
              id="quarPresetSelect"
              defaultValue={
                state.activePresetId
                  ? state.getNestedPresetValue("sounds", "quar")
                  : state.tempPresetValues.sounds.quar
              }
              onChange={(e) =>
                dispatch({ type: "quarPresetSound", value: e.target.value })
              }
            >
              <option value="">Choose a Sound</option>
              <optgroup label="DigiMet">
                <option value={sounds.digital.down}>Down</option>
                <option value={sounds.digital.up}>Up</option>
                <option value={sounds.digital.tap}>Tap</option>
              </optgroup>
              <optgroup label="Drum Kit">
                <option value={sounds.drumkit.boom}>Boom</option>
                <option value={sounds.drumkit.hihat}>Hi-Hat</option>
                <option value={sounds.drumkit.kick}>Kick</option>
                <option value={sounds.drumkit.openHihat}>Open Hi-Hat</option>
                <option value={sounds.drumkit.ride}>Ride Cymbal</option>
                <option value={sounds.drumkit.snare}>Snare</option>
                <option value={sounds.drumkit.tom}>Tom</option>
              </optgroup>
              <optgroup label="Electro Drum">
                <option value={sounds.electrodrum.eHiHat}>Hi-Hat</option>
                <option value={sounds.electrodrum.eKick}>Kick</option>
                <option value={sounds.electrodrum.eSnare}>Snare</option>
              </optgroup>
              <optgroup label="Tabla">
                <option value={sounds.tabla.dha}>Dha</option>
                <option value={sounds.tabla.dhin}>Dhin</option>
                <option value={sounds.tabla.tin}>Tin</option>
              </optgroup>
              <optgroup label="Yamaha">
                <option value={sounds.yamaha.yCowbell}>Cowbell</option>
                <option value={sounds.yamaha.yKick}>Kick</option>
                <option value={sounds.yamaha.yRide}>Ride</option>
                <option value={sounds.yamaha.yRim}>Rim</option>
                <option value={sounds.yamaha.yShaker}>Shaker</option>
              </optgroup>
            </select>
          </div>
          <label htmlFor="quarPresetSelect">Quarter</label>
        </div>
        <div className="soundControl">
          <div className="verticalRange">
            <input
              className="metSlider"
              id="bpm"
              type="range"
              min={-50}
              max={0}
              value={
                state.activePresetId
                  ? state.getNestedPresetValue("volume", "trip")
                  : state.tempPresetValues.volume.trip
              }
              onChange={(e) =>
                dispatch({
                  type: "tripPresetVol",
                  value: Number(e.target.value),
                })
              }
            />
          </div>
          <span id="tripVol">
            {state.activePresetId
              ? state.getNestedPresetValue("volume", "trip")
              : state.tempPresetValues.volume.trip + 50}{" "}
            db
          </span>
          <div>
            <select
              name="tripPresetSelect"
              id="tripPresetSelect"
              defaultValue={
                state.activePresetId
                  ? state.getNestedPresetValue("sounds", "trip")
                  : state.tempPresetValues.sounds.trip
              }
              onChange={(e) =>
                dispatch({ type: "tripPresetSound", value: e.target.value })
              }
            >
              <option value="">Choose a Sound</option>
              <optgroup label="DigiMet">
                <option value={sounds.digital.down}>Down</option>
                <option value={sounds.digital.up}>Up</option>
                <option value={sounds.digital.tap}>Tap</option>
              </optgroup>
              <optgroup label="Drum Kit">
                <option value={sounds.drumkit.boom}>Boom</option>
                <option value={sounds.drumkit.hihat}>Hi-Hat</option>
                <option value={sounds.drumkit.kick}>Kick</option>
                <option value={sounds.drumkit.openHihat}>Open Hi-Hat</option>
                <option value={sounds.drumkit.ride}>Ride Cymbal</option>
                <option value={sounds.drumkit.snare}>Snare</option>
                <option value={sounds.drumkit.tom}>Tom</option>
              </optgroup>
              <optgroup label="Electro Drum">
                <option value={sounds.electrodrum.eHiHat}>Hi-Hat</option>
                <option value={sounds.electrodrum.eKick}>Kick</option>
                <option value={sounds.electrodrum.eSnare}>Snare</option>
              </optgroup>
              <optgroup label="Tabla">
                <option value={sounds.tabla.dha}>Dha</option>
                <option value={sounds.tabla.dhin}>Dhin</option>
                <option value={sounds.tabla.tin}>Tin</option>
              </optgroup>
              <optgroup label="Yamaha">
                <option value={sounds.yamaha.yCowbell}>Cowbell</option>
                <option value={sounds.yamaha.yKick}>Kick</option>
                <option value={sounds.yamaha.yRide}>Ride</option>
                <option value={sounds.yamaha.yRim}>Rim</option>
                <option value={sounds.yamaha.yShaker}>Shaker</option>
              </optgroup>
            </select>
          </div>
          <label htmlFor="tripPresetSelect">Triplet</label>
        </div>
        <div className="soundControl">
          <div className="verticalRange">
            <input
              className="metSlider"
              id="bpm"
              type="range"
              min={-50}
              max={0}
              value={
                state.activePresetId
                  ? state.getNestedPresetValue("volume", "meas")
                  : state.tempPresetValues.volume.meas
              }
              onChange={(e) =>
                dispatch({
                  type: "measPresetVol",
                  value: Number(e.target.value),
                })
              }
            />
          </div>
          <span id="measVol">
            {state.activePresetId
              ? state.getNestedPresetValue("volume", "meas")
              : state.tempPresetValues.volume.meas}{" "}
            db
          </span>
          <div>
            <select
              name="measPresetSelect"
              id="measPresetSelect"
              defaultValue={
                state.activePresetId
                  ? state.getNestedPresetValue("sounds", "meas")
                  : state.tempPresetValues.sounds.meas
              }
              onChange={(e) =>
                dispatch({ type: "measPresetSound", value: e.target.value })
              }
            >
              <option value="">Choose a Sound</option>
              <optgroup label="DigiMet">
                <option value={sounds.digital.down}>Down</option>
                <option value={sounds.digital.up}>Up</option>
                <option value={sounds.digital.tap}>Tap</option>
              </optgroup>
              <optgroup label="Drum Kit">
                <option value={sounds.drumkit.boom}>Boom</option>
                <option value={sounds.drumkit.hihat}>Hi-Hat</option>
                <option value={sounds.drumkit.kick}>Kick</option>
                <option value={sounds.drumkit.openHihat}>Open Hi-Hat</option>
                <option value={sounds.drumkit.ride}>Ride Cymbal</option>
                <option value={sounds.drumkit.snare}>Snare</option>
                <option value={sounds.drumkit.tom}>Tom</option>
              </optgroup>
              <optgroup label="Electro Drum">
                <option value={sounds.electrodrum.eHiHat}>Hi-Hat</option>
                <option value={sounds.electrodrum.eKick}>Kick</option>
                <option value={sounds.electrodrum.eSnare}>Snare</option>
              </optgroup>
              <optgroup label="Tabla">
                <option value={sounds.tabla.dha}>Dha</option>
                <option value={sounds.tabla.dhin}>Dhin</option>
                <option value={sounds.tabla.tin}>Tin</option>
              </optgroup>
              <optgroup label="Yamaha">
                <option value={sounds.yamaha.yCowbell}>Cowbell</option>
                <option value={sounds.yamaha.yKick}>Kick</option>
                <option value={sounds.yamaha.yRide}>Ride</option>
                <option value={sounds.yamaha.yRim}>Rim</option>
                <option value={sounds.yamaha.yShaker}>Shaker</option>
              </optgroup>
            </select>
          </div>
          <label htmlFor="measPresetSelect">Measure</label>
        </div>
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
      <div className="programControls">
        <button
          className="saveChanges"
          id={state.activeProgramId}
          onClick={() =>
            state.activePresetId
              ? (dispatch({ type: "resetTempPresetValues" }),
                dispatch({ type: "removeActivePreset" }))
              : dispatch({ type: "addPreset" })
          }
          disabled={!state.activeProgramId}
        >
          {state.activePresetId ? "Close Preset" : "Save Preset"}
        </button>
        {state.activePresetId ? (
          <>
            <button
              className="revert"
              onClick={() => {
                dispatch({ type: "revertPresetChanges" });
              }}
              disabled={!state.changesMade}
            >
              Revert
            </button>
            <button
              className="deletePreset"
              onClick={() => {
                dispatch({ type: "resetTempPresetValues" });
                dispatch({ type: "deletePreset" });
              }}
            >
              Delete
            </button>
          </>
        ) : (
          <button className="cancel" onClick={state.handleCancelNewPreset}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
