import React from "react";
import { useStateContext } from "../ToneContext";

export default function Preset({ innerRef, provided, preset }) {
  const [state, dispatch] = useStateContext();

  return (
    <div
      // {...provided.draggableProps}
      // {...provided.dragHandleProps}
      // ref={innerRef}
      className="presetBox"
      name={preset.id}
      id={preset.id}
      style={{
        backgroundColor: preset.id === state.activePresetId ? "orange" : null,
      }}
      onClick={() => {
        dispatch({ type: "selectPreset", value: preset.id });
      }}
    >
      <div>{preset.title}</div>
      <div>{preset.tempo}bpm</div>
      <div>{preset.iterations}m</div>
      <div>{preset.timeSignature}/4</div>
    </div>
  );
}
