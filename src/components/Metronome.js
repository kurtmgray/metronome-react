import React, { useEffect } from "react";
import { useStateContext } from "../ToneContext";
import classNames from "classnames";
import sounds from "./Sounds";

export default function Metronome() {
  const [state, dispatch] = useStateContext();

  useEffect(() => {
    dispatch({ type: "selectProgram" });
  }, []);

  return (
    <>
      <div className="metronome">
        <div className="controls" id="controls">
          <div className="mainDisplay">
            <div className="notes">
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[1],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[2],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[3],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[4],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[5],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[6],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[7],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[8],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[9],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[10],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[11],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[12],
                })}
              ></div>
              <div
                id=""
                className={classNames("note", {
                  active: state.activeDrawNotes[13],
                })}
              ></div>
            </div>
            <div className="digitDisplayMet">
              <div className="displayElementMet">
                <span className="digitDisplayNumber">{state.tempo}</span>
                <h3>Tempo</h3>
              </div>
              <div className="displayElementMet">
                <span className="digitDisplayNumber">
                  {state.currentBeat || "0"} / {state.beatsPerMeasure}
                </span>
                <div className="beatTsLabel">
                  <h3>Beat</h3>
                  <h3>Time Sig</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="tempoTimeSliders">
            <div className="tempoBox">
              <div>
                <input
                  className="tempoSlider"
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
                <p>Tempo</p>
              </div>
              <div>
                <input
                  className="tempoSlider"
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
                <p>
                  Time Signature
                  {/* <span id="showBPM">{state.beatsPerMeasure}</span> */}
                </p>
              </div>
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
                  value={state.sixtVol}
                  onChange={(e) =>
                    dispatch({ type: "sixtVol", value: Number(e.target.value) })
                  }
                />
              </div>
              <span id="sixtVol">{state.sixtVol}</span>
              <div>
                <select
                  name="sixtSelect"
                  id="sixtSelect"
                  value={state.sixtUrl}
                  onChange={(e) =>
                    dispatch({ type: "sixtSound", value: e.target.value })
                  }
                  disabled={state.isPlaying}
                >
                  <optgroup label="DigiMet">
                    <option value={sounds.digital.down}>Down</option>
                    <option value={sounds.digital.up}>Up</option>
                    <option value={sounds.digital.tap}>Tap</option>
                  </optgroup>
                  <optgroup label="Drum Kit">
                    <option value={sounds.drumkit.boom}>Boom</option>
                    <option value={sounds.drumkit.hihat}>Hi-Hat</option>
                    <option value={sounds.drumkit.kick}>Kick</option>
                    <option value={sounds.drumkit.openHihat}>Hi-Hat 2</option>
                    <option value={sounds.drumkit.ride}>Ride</option>
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
              <label htmlFor="sixtSelect">16th</label>
            </div>

            <div className="soundControl">
              <div className="verticalRange">
                <input
                  className="metSlider"
                  id="bpm"
                  type="range"
                  min={-50}
                  max={0}
                  value={state.eighVol}
                  onChange={(e) =>
                    dispatch({ type: "eighVol", value: Number(e.target.value) })
                  }
                />
              </div>
              <span id="eighVol">{state.eighVol}</span>
              <div>
                <select
                  name="eighSelect"
                  id="eighSelect"
                  value={state.eighUrl}
                  onChange={(e) =>
                    dispatch({ type: "eighSound", value: e.target.value })
                  }
                  disabled={state.isPlaying}
                >
                  <optgroup label="DigiMet">
                    <option value={sounds.digital.down}>Down</option>
                    <option value={sounds.digital.up}>Up</option>
                    <option value={sounds.digital.tap}>Tap</option>
                  </optgroup>
                  <optgroup label="Drum Kit">
                    <option value={sounds.drumkit.boom}>Boom</option>
                    <option value={sounds.drumkit.hihat}>Hi-Hat</option>
                    <option value={sounds.drumkit.kick}>Kick</option>
                    <option value={sounds.drumkit.openHihat}>Hi-Hat 2</option>
                    <option value={sounds.drumkit.ride}>Ride</option>
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
              <label htmlFor="eighSelect">8th</label>
            </div>
            <div className="soundControl">
              <div className="verticalRange">
                <input
                  className="metSlider"
                  id="bpm"
                  type="range"
                  min={-50}
                  max={0}
                  value={state.quarVol}
                  onChange={(e) =>
                    dispatch({ type: "quarVol", value: Number(e.target.value) })
                  }
                />
              </div>
              <span id="quarVol">{state.quarVol}</span>
              <div>
                <select
                  name="quarSelect"
                  id="quarSelect"
                  defaultValue={state.quarUrl}
                  onChange={(e) =>
                    dispatch({ type: "quarSound", value: e.target.value })
                  }
                  disabled={state.isPlaying}
                >
                  <optgroup label="DigiMet">
                    <option value={sounds.digital.down}>Down</option>
                    <option value={sounds.digital.up}>Up</option>
                    <option value={sounds.digital.tap}>Tap</option>
                  </optgroup>
                  <optgroup label="Drum Kit">
                    <option value={sounds.drumkit.boom}>Boom</option>
                    <option value={sounds.drumkit.hihat}>Hi-Hat</option>
                    <option value={sounds.drumkit.kick}>Kick</option>
                    <option value={sounds.drumkit.openHihat}>Hi-Hat 2</option>
                    <option value={sounds.drumkit.ride}>Ride</option>
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
              <label htmlFor="quarSelect">Quarter</label>
            </div>
            <div className="soundControl">
              <div className="verticalRange">
                <input
                  className="metSlider"
                  id="bpm"
                  type="range"
                  min={-50}
                  max={0}
                  value={state.tripVol}
                  onChange={(e) =>
                    dispatch({ type: "tripVol", value: Number(e.target.value) })
                  }
                />
              </div>
              <span id="tripVol">{state.tripVol}</span>
              <div>
                <select
                  name="tripSelect"
                  id="tripSelect"
                  value={state.tripUrl}
                  onChange={(e) =>
                    dispatch({ type: "tripSound", value: e.target.value })
                  }
                  disabled={state.isPlaying}
                >
                  <optgroup label="DigiMet">
                    <option value={sounds.digital.down}>Down</option>
                    <option value={sounds.digital.up}>Up</option>
                    <option value={sounds.digital.tap}>Tap</option>
                  </optgroup>
                  <optgroup label="Drum Kit">
                    <option value={sounds.drumkit.boom}>Boom</option>
                    <option value={sounds.drumkit.hihat}>Hi-Hat</option>
                    <option value={sounds.drumkit.kick}>Kick</option>
                    <option value={sounds.drumkit.openHihat}>Hi-Hat 2</option>
                    <option value={sounds.drumkit.ride}>Ride</option>
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
              <label htmlFor="tripSelect">Triplet</label>
            </div>
            <div className="soundControl">
              <div className="verticalRange">
                <input
                  className="metSlider"
                  id="bpm"
                  type="range"
                  min={-50}
                  max={0}
                  value={state.measVol}
                  onChange={(e) =>
                    dispatch({ type: "measVol", value: Number(e.target.value) })
                  }
                />
              </div>
              <span id="measVol">{state.measVol}</span>
              <div>
                <select
                  name="measSelect"
                  id="measSelect"
                  value={state.measUrl}
                  onChange={(e) =>
                    dispatch({ type: "measSound", value: e.target.value })
                  }
                  disabled={state.isPlaying}
                >
                  <optgroup label="DigiMet">
                    <option value={sounds.digital.down}>Down</option>
                    <option value={sounds.digital.up}>Up</option>
                    <option value={sounds.digital.tap}>Tap</option>
                  </optgroup>
                  <optgroup label="Drum Kit">
                    <option value={sounds.drumkit.boom}>Boom</option>
                    <option value={sounds.drumkit.hihat}>Hi-Hat</option>
                    <option value={sounds.drumkit.kick}>Kick</option>
                    <option value={sounds.drumkit.openHihat}>Hi-Hat 2</option>
                    <option value={sounds.drumkit.ride}>Ride</option>
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
              <label htmlFor="measSelect">Measure</label>
            </div>
            <div className="soundControl">
              <div className="verticalRange">
                <input
                  className="metSlider"
                  id="mastVol"
                  type="range"
                  min={-50}
                  max={0}
                  value={state.mastVol}
                  onChange={(e) =>
                    dispatch({ type: "mastVol", value: Number(e.target.value) })
                  }
                />
              </div>
              <span id="mastVol">{state.mastVol}</span>
              <label className="mastVolLabel" htmlFor="mastVol">
                <h3>Master Volume</h3>
              </label>
            </div>
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
      </div>
      <pre>
        App State:
        {JSON.stringify(state, null, "\t")}
      </pre>
    </>
  );
}
