import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../ToneContext";

export default function Program() {
  const [state, dispatch] = useStateContext();

  return (
    <div>
      <p>PROGRAMS.JS</p>
      Select a Program
      {state.programs.length ? (
        state.programs.map((program) => (
          <div id={program.id} key={program.id}>
            <Link to="/program">
              <p id={program.id} onClick={(e) => state.handleSelectProgram(e)}>
                {program.title}
              </p>
            </Link>
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
      <pre>
        App State:
        {JSON.stringify(state, null, "\t")}
      </pre>
    </div>
  );
}
