import React from "react";
import PresetBox from "./PresetBox";
import PresetDetails from "./PresetDetails";
import { useStateContext } from "../ToneContext";

export default function Program() {
  const [state, dispatch] = useStateContext();
  return (
    <div>
      <div className="program">
        <input
          className="programTitle"
          placeholder="Enter program title"
          type="text"
          data-whatever={state.activeProgramId}
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
        <div className="programDisplay">
          <div>
            <h3>Beat</h3>
            <p>{state.currentBeat}</p>
          </div>
          <div>
            <h3>Measure</h3>
            <p>
              {state.currentMeasure} of {state.currentMeasures}
            </p>
          </div>
          <div>
            <h3>Tempo</h3>
            <p>{state.currentTempo}</p>
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

        {/* <button onClick={() => dispatch({ type: "programMode" })}>
        Return to Metronome
      </button> */}
        {/* <button
        id={state.activeProgramId}
        className="play"
        onClick={() => {
          dispatch({ type: "selectProgram" });
          state.handleCancelNewPreset();
        }}
      >
        View Programs
      </button> */}
        {(state.createPresetMode || state.activePresetId) && <PresetDetails />}
      </div>
      <pre>
        App State:
        {JSON.stringify(state, null, "\t")}
      </pre>
    </div>
  );
}
