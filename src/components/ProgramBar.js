import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/itemTypes";
import { Link } from "react-router-dom";
import { useStateContext } from "../ToneContext";
const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};
export default function ProgramBar({ program, index }) {
  const [state, dispatch] = useStateContext();
  const ref = useRef();
  const [{ isOver, handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      console.log(item);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      console.log("hovering");
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      console.log(item);
      state.moveProgramBar(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id: program.id, index, type: ItemTypes.CARD, ...program },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const opacity = { opacity: isDragging ? 0 : 1 };
  drag(drop(ref));

  return (
    <Link
      style={{ textDecoration: "none" }}
      to="/program"
      onClick={(e) => {
        if (e.target.dataset.id === program.id) {
          e.preventDefault();
        }
      }}
    >
      <div
        ref={ref}
        style={opacity}
        data-handler-id={handlerId} // not certain what this is doing
        onClick={(e) => {
          if (e.target.dataset.id !== program.id) state.handleSelectProgram(e);
        }}
        className="programBar"
        id={program.id}
      >
        <input
          data-id={program.id}
          className=""
          placeholder="Enter program title"
          type="text"
          data-whatever={state.activeProgramId}
          value={program.title}
          // onFocus={(e) => state.handleSelectProgram(e)}
          //   onFocus={(e) => e.stopPropagation()}
          onChange={(e) => {
            console.log(program.id);
            dispatch({
              type: "updateProgramTitle",
              value: e.target.value,
              id: program.id,
            });
          }}
        />
        <button
          data-id={program.id}
          onClick={(e) => {
            e.preventDefault();
            dispatch({ type: "deleteProgram", value: e.target.dataset.id });
          }}
        >
          Delete
        </button>
      </div>
    </Link>
  );
}
