import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Preset from "./Preset";
import PresetDetails from "./PresetDetails";
import { useStateContext } from "../ToneContext";
export default function Program() {
  const [state, dispatch] = useStateContext();

  return (
    <div>
      <div className="program">
        <input
          className="programTitle"
          type="text"
          // id should be used for styling only
          // id={state.activeProgramId}
          data-whatever={state.activeProgramId}
          value={
            state.programs.find(
              (program) => program.id === state.activeProgramId
            ).title
          }
          onChange={(e) => {
            dispatch({ type: "programTitle", value: e.target.value });
          }}
        />
        {state.activeProgramId &&
        state.programs.find((program) => program.id === state.activeProgramId)
          .presets.length > 0 ? (
          // <DragDropContext>
          //   <Droppable droppableId="presets">
          //     {(provided) => {
          <div
            className="presetContainer"
            // {...provided.droppableProps}
            // ref={provided.innerRef}
          >
            {state.programs.map((program) =>
              program.id === state.activeProgramId
                ? program.presets.map((preset, index) => (
                    // <Draggable
                    //   key={preset.id}
                    //   draggableId={preset.id}
                    //   index={index}
                    // >
                    //   {(provided) => {
                    <div>
                      <Preset
                        key={preset.id}
                        preset={preset}
                        // innerRef={provided.innerRef}
                        // provided={provided}
                      />
                    </div>
                    // }}
                    // </Draggable>
                  ))
                : null
            )}
          </div>
        ) : //     }}
        //   </Droppable>
        // </DragDropContext>
        null}
        <div className="programControls">
          {!state.isPlaying ? (
            <button
              className="play"
              onClick={() => dispatch({ type: "play" })}
              disabled={
                state.activeProgramId &&
                !state.programs.find(
                  (program) => program.id === state.activeProgramId
                ).presets.length > 0
              }
            >
              Play Program
            </button>
          ) : (
            <button className="stop" onClick={() => dispatch({ type: "stop" })}>
              Stop Program
            </button>
          )}
          <button
            id="createPreset"
            className="createPreset"
            onClick={() => {
              dispatch({ type: "createPreset" });
            }}
            disabled={state.createPresetMode}
          >
            Create Preset
          </button>
        </div>

        {/* <button onClick={() => dispatch({ type: "programMode" })}>
        Return to Metronome
      </button> */}
        {/* <button
        id={state.activeProgramId}
        className="play"
        onClick={() => {
          dispatch({ type: "selectProgram" });
          state.handleCancelNewPreset();
        }}
      >
        View Programs
      </button> */}
        {(state.createPresetMode || state.activePresetId) && <PresetDetails />}
      </div>
      <pre>
        App State:
        {JSON.stringify(state, null, "\t")}
      </pre>
    </div>
  );
}
