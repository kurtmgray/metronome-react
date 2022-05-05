import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../ToneContext";

export default function Program() {
  const [state, dispatch] = useStateContext();
  useEffect(() => {
    dispatch({ type: "selectProgram" });
  }, []);
  return (
    <div className="programs">
      <h2>Select a Program</h2>
      {state.programs.length ? (
        state.programs.map((program) => (
          <div className="programBar" id={program.id} key={program.id}>
            <Link to="/program">
              <p id={program.id} onClick={(e) => state.handleSelectProgram(e)}>
                {program.title}
              </p>
            </Link>
            <button
              id={program.id}
              onClick={(e) => {
                dispatch({ type: "deleteProgram", value: e.target.id });
              }}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>You currently have no programs.</p>
      )}
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
