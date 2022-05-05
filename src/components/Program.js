import React, { useEffect } from "react";
import Preset from "./Preset";
import CreatePreset from "./PresetDetails";
import { useStateContext } from "../ToneContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
export default function Program() {
  const [state, dispatch] = useStateContext();
  useEffect(() => {}, [state.activeProgramId]);

  const presetsInProgram =
    state.programs.find((program) => program.id === state.activeProgramId)
      .presets.length > 0;

  return (
    <div>
      <div className="program">
        <input
          className="programTitle"
          type="text"
          id={state.activeProgramId}
          value={state.programs.map((program) =>
            program.id === state.activeProgramId ? program.title : null
          )}
          onChange={(e) => {
            dispatch({ type: "programTitle", value: e.target.value });
          }}
        />
        {presetsInProgram ? (
          <DragDropContext>
            <Droppable droppableId="presets">
              {(provided) => {
                <div
                  className="presetContainer"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {state.programs.map((program) =>
                    program.id === state.activeProgramId
                      ? program.presets.map((preset, index) => (
                          <Draggable
                            key={preset.id}
                            draggableId={preset.id}
                            index={index}
                          >
                            {(provided) => {
                              <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <Preset key={preset.id} preset={preset} />;
                              </div>;
                            }}
                          </Draggable>
                        ))
                      : null
                  )}
                </div>;
              }}
            </Droppable>
          </DragDropContext>
        ) : null}
        <div className="programControls">
          {!state.isPlaying ? (
            <button
              className="play"
              onClick={() => dispatch({ type: "play" })}
              disabled={!presetsInProgram}
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
        {(state.createPresetMode || state.activePresetId) && <CreatePreset />}
      </div>
      <pre>
        App State:
        {JSON.stringify(state, null, "\t")}
      </pre>
    </div>
  );
}
