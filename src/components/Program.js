import React, { useEffect } from "react";
import Preset from "./Preset";
import CreatePreset from "./CreatePreset";
import { useStateContext } from "../ToneContext";

export default function Program() {
  const [state, dispatch] = useStateContext();
  useEffect(() => {
    console.log("render");
  }, [state.activeProgram]);
  return (
    <div>
      <p>PROGRAM.JS</p>
      <input
        type="text"
        id={state.activeProgram.id}
        value={state.activeProgram.title}
        onChange={(e) => {
          dispatch({ type: "programTitle", value: e.target.value });
          dispatch({
            type: "syncActiveProgramTitle",
            value: state.activeProgram.id,
          });
        }}
      />
      {state.activeProgram.presets.map((preset) => (
        <Preset key={preset.id} preset={preset} />
      ))}
      {!state.isPlaying ? (
        <button onClick={() => dispatch({ type: "play" })}>
          Play Selected Program
        </button>
      ) : (
        <button onClick={() => dispatch({ type: "stop" })}>Stop Program</button>
      )}
      <button
        id="createPreset"
        className="create"
        onClick={() => {
          dispatch({ type: "createPreset" });
        }}
        disabled={state.createPresetMode}
      >
        Create Preset
      </button>

      <button onClick={() => dispatch({ type: "programMode" })}>
        Return to Metronome
      </button>
      <button
        id="viewPrograms"
        className="play"
        onClick={() => {
          dispatch({ type: "selectProgram" });
          state.handleCancelNewPreset();
        }}
      >
        View Programs
      </button>
      {state.createPresetMode && <CreatePreset />}
    </div>
  );
}
