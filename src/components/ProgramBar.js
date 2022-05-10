import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../utils/itemTypes";
import { Link } from "react-router-dom";

export default function ProgramBar({ program }) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    id: program.id,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      opacity={isDragging ? "0.5" : "1"}
      className="programBar"
      id={program.id}
      key={program.id}
    >
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
  );
}
