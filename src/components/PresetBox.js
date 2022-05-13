import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../utils/itemTypes";
import { useStateContext } from "../ToneContext";
const style = {
  border: "1px dashed gray",
  padding: "0.5rem 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  cursor: "move",
};
export default function PresetBox({ preset, index }) {
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
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientX = clientOffset.x - hoverBoundingRect.left;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }
      // Time to actually perform the action
      state.movePresetBox(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id: preset.id, index, type: ItemTypes.CARD, ...preset },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: preset.id === state.activePresetId ? "orange" : null,
        opacity: isDragging ? 0 : 1,
      }} // why is this not being applied?
      data-handler-id={handlerId}
      className="presetBox"
      name={preset.id}
      id={preset.id} // should use only for style purposes, will fix
      onClick={() => {
        state.createPresetMode
          ? null
          : dispatch({ type: "selectPreset", value: preset.id });
      }}
    >
      <div>{preset.title}</div>
      <div>{preset.tempo}bpm</div>
      <div>{preset.iterations}m</div>
      <div>{preset.timeSignature}/4</div>
    </div>
  );
}
