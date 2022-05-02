import React from "react";
import { useStateContext } from "../ToneContext";

export default function EditProgram() {
  const [state, dispatch] = useStateContext();

  return (
    <div>
      <input
        type="text"
        value={state.programs.map((program) =>
          program.id === state.activeProgramId ? program.title : null
        )}
        onChange={(e) => {
          dispatch({ type: "programTitle", value: e.target.value });
        }}
      ></input>
    </div>
  );
}
