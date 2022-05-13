import React, { useEffect } from "react";
import { useStateContext } from "../ToneContext";
import ProgramBar from "./ProgramBar";

export default function Program() {
  const [state, dispatch] = useStateContext();

  useEffect(() => {
    dispatch({ type: "selectProgram" });
  }, []);

  return (
    <div className="programs">
      <h2>Select a Program</h2>
      <div className="programBarContainer">
        {state.programs.length ? (
          state.programs.map((program, index) => (
            <ProgramBar key={program.id} program={program} index={index} />
          ))
        ) : (
          <p>You currently have no programs.</p>
        )}
      </div>
      <button
        id="addProgram"
        className="addProgram"
        onClick={state.handleCreateProgram}
      >
        Add a Program
      </button>
      {/* <pre>
        App State:
        {JSON.stringify(state, null, "\t")}
      </pre> */}
    </div>
  );
}
