import React from "react";
import classNames from "classnames";
import PresetBox from "./PresetBox";
import PresetDetails from "./PresetDetails";
import { useStateContext } from "../ToneContext";

export default function Program() {
  const [state, dispatch] = useStateContext();
  return (
    <div>
      <div className="program">
        <div className="programHead">
          <input
            className="programTitle"
            placeholder="Enter program title"
            type="text"
            value={
              state.programs.find(
                (program) => program.id === state.activeProgramId
              ).title
            }
            onChange={(e) => {
              dispatch({
                type: "updateProgramTitle",
                value: e.target.value,
                id: state.activeProgramId,
              });
            }}
          />
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
          <div className="digitDisplay">
            <div className="displayElement">
              {state.currentMeasure ? (
                <span className="digitDisplayNumber">
                  {state.currentMeasure} / {state.currentMeasures}
                </span>
              ) : (
                <span className="digitDisplayNumber">0</span>
              )}
              <h3>Bar</h3>
            </div>
            <div className="displayElement">
              <span className="digitDisplayNumber">
                {state.currentBeat || "0"}
              </span>
              <h3>Beat</h3>
            </div>
            <div className="displayElement">
              <span className="digitDisplayNumber">
                {state.currentTempo || "0"}
              </span>
              <h3>BPM</h3>
            </div>
          </div>
        </div>
        {state.activeProgramId &&
        state.programs.find((program) => program.id === state.activeProgramId)
          .presets.length > 0 ? (
          <div className="presetContainer">
            {state.programs.map((program) =>
              program.id === state.activeProgramId
                ? program.presets.map((preset, index) => (
                    <PresetBox key={preset.id} preset={preset} index={index} />
                  ))
                : null
            )}
          </div>
        ) : (
          "No presets in program."
        )}
        <div className="programControls">
          {!state.isPlaying ? (
            <button
              className="play"
              onClick={() => dispatch({ type: "play" })}
              disabled={
                state.activeProgramId &&
                !state.programs.find(
                  (program) => program.id === state.activeProgramId
                ).presets.length > 0
              }
            >
              Play Program
            </button>
          ) : (
            <button className="stop" onClick={() => dispatch({ type: "stop" })}>
              Stop Program
            </button>
          )}
          <button
            id="createPreset"
            className="createPreset"
            onClick={() => {
              dispatch({ type: "createPreset" });
            }}
            disabled={state.activePresetId}
          >
            Create Preset
          </button>
        </div>
        {(state.createPresetMode || state.activePresetId) && <PresetDetails />}
      </div>
      <pre>
        App State:
        {JSON.stringify(state, null, "\t")}
      </pre>
    </div>
  );
}
