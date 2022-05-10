import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { useStateContext } from "../ToneContext";
import { ItemTypes } from "../utils/itemTypes";
import ProgramBar from "./ProgramBar";

export default function Program() {
  const [state, dispatch] = useStateContext();
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  useEffect(() => {
    dispatch({ type: "selectProgram" });
  }, []);

  return (
    <div className="programs">
      <h2>Select a Program</h2>
      <div
        className="programBarContainer"
        ref={drop}
        style={{ backgroundColor: isOver ? "green" : null }}
      >
        {state.programs.length ? (
          state.programs.map((program) => <ProgramBar program={program} />)
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
