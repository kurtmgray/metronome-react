import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import * as Tone from "tone";
import sounds from "./Sounds";
import { v4 as uuidv4 } from "uuid";
import { scheduleDraw, length } from "./Utilities";

const initialState = {
  isPlaying: false,
  activeDrawNotes: {},
  tempo: Tone.Transport.bpm.value,
  beatsPerMeasure: 4,
  currentBeat: null,
  currentMeasure: null,
  currentMeasures: null,
  currentTempo: null,
  currentTimeSig: null,
  mastVol: -15,
  measVol: -15,
  quarVol: -15,
  eighVol: -15,
  tripVol: -15,
  sixtVol: -15,
  measUrl: sounds.boom,
  quarUrl: sounds.kick,
  eighUrl: sounds.ride,
  tripUrl: sounds.hihat,
  sixtUrl: sounds.claves,
  lastClick: null,
  secondToLastClick: null,
  activePresetId: null,
  activeProgramId: JSON.parse(localStorage.getItem("activeProgramId")) || "",
  changesMade: false,
  programMode: false,
  createPresetMode: false,
  tempPresetValues: {
    id: uuidv4(),
    title: "",
    tempo: 120,
    iterations: 1,
    timeSignature: 4,
    sounds: {
      meas: "",
      quar: "",
      eigh: "",
      trip: "",
      sixt: "",
    },
    volume: {
      meas: -15,
      quar: -15,
      eigh: -15,
      trip: -15,
      sixt: -15,
    },
  },
  programs: JSON.parse(localStorage.getItem("programs")) || [],
};

const initialMethods = {
  startProgram: () => {},
};

const StateContext = createContext([
  { ...initialState, ...initialMethods },
  () => {},
]);

export const useStateContext = () => useContext(StateContext);

const reducer = (state, action) => {
  switch (action.type) {
    case "play":
      return { ...state, isPlaying: true };
    case "stop":
      return { ...state, isPlaying: false, currentBeat: null };
    case "resetCurrentBeat":
      return { ...state, currentBeat: null };
    case "tempo":
      return { ...state, tempo: action.value };
    case "toggleActiveDrawNote":
      return {
        ...state,
        activeDrawNotes: {
          ...state.activeDrawNotes,
          [action.value]: !state.activeDrawNotes[action.value],
        },
      };
    case "beatsPerMeasure":
      return { ...state, beatsPerMeasure: action.value };
    case "mastVol":
      return { ...state, mastVol: action.value };
    case "measVol":
      return { ...state, measVol: action.value };
    case "quarVol":
      return { ...state, quarVol: action.value };
    case "eighVol":
      return { ...state, eighVol: action.value };
    case "tripVol":
      return { ...state, tripVol: action.value };
    case "sixtVol":
      return { ...state, sixtVol: action.value };
    case "programMode":
      return { ...state, programMode: action.value };
    case "measSound":
      return { ...state, measUrl: action.value };
    case "quarSound":
      return { ...state, quarUrl: action.value };
    case "eighSound":
      return { ...state, eighUrl: action.value };
    case "tripSound":
      return { ...state, tripUrl: action.value };
    case "sixtSound":
      return { ...state, sixtUrl: action.value };
    case "sixtPresetSound": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          sounds: {
                            ...preset.sounds,
                            sixt: action.value,
                          },
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            sounds: {
              ...state.tempPresetValues.sounds,
              sixt: action.value,
            },
          },
        };
      }
    }
    case "tripPresetSound": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          sounds: {
                            ...preset.sounds,
                            trip: action.value,
                          },
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            sounds: {
              ...state.tempPresetValues.sounds,
              trip: action.value,
            },
          },
        };
      }
    }
    case "eighPresetSound": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          sounds: {
                            ...preset.sounds,
                            eigh: action.value,
                          },
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            sounds: {
              ...state.tempPresetValues.sounds,
              eigh: action.value,
            },
          },
        };
      }
    }
    case "quarPresetSound": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          sounds: {
                            ...preset.sounds,
                            quar: action.value,
                          },
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            sounds: {
              ...state.tempPresetValues.sounds,
              quar: action.value,
            },
          },
        };
      }
    }
    case "measPresetSound": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          sounds: {
                            ...preset.sounds,
                            meas: action.value,
                          },
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            sounds: {
              ...state.tempPresetValues.sounds,
              meas: action.value,
            },
          },
        };
      }
    }
    case "sixtPresetVol": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          volume: {
                            ...preset.volume,
                            sixt: action.value,
                          },
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            volume: {
              ...state.tempPresetValues.volume,
              sixt: action.value,
            },
          },
        };
      }
    }
    case "tripPresetVol": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          volume: {
                            ...preset.volume,
                            trip: action.value,
                          },
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            volume: {
              ...state.tempPresetValues.volume,
              trip: action.value,
            },
          },
        };
      }
    }
    case "eighPresetVol": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          volume: {
                            ...preset.volume,
                            eigh: action.value,
                          },
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            volume: {
              ...state.tempPresetValues.volume,
              eigh: action.value,
            },
          },
        };
      }
    }
    case "quarPresetVol": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          volume: {
                            ...preset.volume,
                            quar: action.value,
                          },
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            volume: {
              ...state.tempPresetValues.volume,
              quar: action.value,
            },
          },
        };
      }
    }
    case "measPresetVol": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          volume: {
                            ...preset.volume,
                            meas: action.value,
                          },
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            volume: {
              ...state.tempPresetValues.volume,
              meas: action.value,
            },
          },
        };
      }
    }
    case "updatePresetTitle": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          title: action.value,
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            title: action.value,
          },
        };
      }
    }
    case "presetTempo": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          tempo: action.value,
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            tempo: action.value,
          },
        };
      }
    }
    case "presetIterations": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          iterations: action.value,
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            iterations: action.value,
          },
        };
      }
    }
    case "presetBeatsPerMeasure": {
      if (state.activePresetId) {
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? {
                  ...program,
                  presets: program.presets.map((preset) =>
                    preset.id === state.activePresetId
                      ? {
                          ...preset,
                          timeSignature: action.value,
                        }
                      : preset
                  ),
                }
              : program
          ),
          changesMade: true,
        };
      } else {
        return {
          ...state,
          tempPresetValues: {
            ...state.tempPresetValues,
            timeSignature: action.value,
          },
        };
      }
    }
    case "resetTempPresetValues":
      return {
        ...state,
        tempPresetValues: {
          title: "",
          id: uuidv4(),
          tempo: 120,
          iterations: 1,
          timeSignature: 4,
          sounds: {
            meas: "",
            quar: "",
            eigh: "",
            trip: "",
            sixt: "",
          },
          volume: {
            meas: -15,
            quar: -15,
            eigh: -15,
            trip: -15,
            sixt: -15,
          },
        },
      };
    case "createPreset":
      return { ...state, createPresetMode: !state.createPresetMode };
    case "addProgram":
      return { ...state, programs: [...state.programs, action.value] };
    case "revertPresetChanges": {
      return {
        ...state,
        programs: state.programs.map((program) =>
          program.id === state.activeProgramId
            ? {
                ...program,
                presets: program.presets.map((preset) =>
                  preset.id === state.activePresetId
                    ? { ...state.tempPresetValues }
                    : preset
                ),
              }
            : program
        ),
        changesMade: false,
      };
    }
    case "selectPreset": {
      const progIdx = state.programs.findIndex(
        (program) => program.id === state.activeProgramId
      );
      const presIdx = state.programs[progIdx].presets.findIndex(
        (preset) => preset.id === action.value
      );
      const preset = {
        id: action.value,
        title: state.programs[progIdx].presets[presIdx].title,
        tempo: state.programs[progIdx].presets[presIdx].tempo,
        iterations: state.programs[progIdx].presets[presIdx].iterations,
        timeSignature: state.programs[progIdx].presets[presIdx].timeSignature,
        sounds: {
          meas: state.programs[progIdx].presets[presIdx].sounds.meas,
          quar: state.programs[progIdx].presets[presIdx].sounds.quar,
          eigh: state.programs[progIdx].presets[presIdx].sounds.eigh,
          trip: state.programs[progIdx].presets[presIdx].sounds.trip,
          sixt: state.programs[progIdx].presets[presIdx].sounds.sixt,
        },
        volume: {
          meas: state.programs[progIdx].presets[presIdx].volume.meas,
          quar: state.programs[progIdx].presets[presIdx].volume.quar,
          eigh: state.programs[progIdx].presets[presIdx].volume.eigh,
          trip: state.programs[progIdx].presets[presIdx].volume.trip,
          sixt: state.programs[progIdx].presets[presIdx].volume.sixt,
        },
      };
      if (state.activePresetId === action.value) {
        return { ...state };
      } else
        return !state.activePresetId
          ? { ...state, activePresetId: action.value, tempPresetValues: preset }
          : { ...state, activePresetId: undefined };
    }
    case "removeActivePreset":
      return {
        ...state,
        activePresetId: null,
        changesMade: false,
      };
    case "selectProgram": {
      if (state.activeProgramId === action.value) {
        return { ...state };
      } else
        return !state.activeProgramId
          ? { ...state, activeProgramId: action.value }
          : { ...state, activeProgramId: undefined };
    }
    case "updateProgramTitle":
      return {
        ...state,
        programs: state.programs.map((program) =>
          program.id ===
          // state.activeProgramId ||
          action.id
            ? {
                ...program,
                title: action.value,
              }
            : program
        ),
      };
    case "addPreset": {
      let programCopy = state.programs.find(
        (program) => program.id === state.activeProgramId
      );
      const preset = {
        id: uuidv4(), // uuid
        title: state.tempPresetValues.title,
        tempo: state.tempPresetValues.tempo,
        iterations: state.tempPresetValues.iterations,
        timeSignature: state.tempPresetValues.timeSignature,
        sounds: {
          meas: state.tempPresetValues.sounds.meas,
          quar: state.tempPresetValues.sounds.quar,
          eigh: state.tempPresetValues.sounds.eigh,
          trip: state.tempPresetValues.sounds.trip,
          sixt: state.tempPresetValues.sounds.sixt,
        },
        volume: {
          meas: state.tempPresetValues.volume.meas,
          quar: state.tempPresetValues.volume.quar,
          eigh: state.tempPresetValues.volume.eigh,
          trip: state.tempPresetValues.volume.trip,
          sixt: state.tempPresetValues.volume.sixt,
        },
      };
      const emptySound = Object.values(preset.sounds).includes("");
      if (emptySound) {
        alert("Empty value in sounds object.");
        return { ...state };
      } else {
        const presets = [...programCopy.presets, preset];
        return {
          ...state,
          programs: state.programs.map((program) =>
            program.id === state.activeProgramId
              ? { ...program, presets: presets }
              : program
          ),
          tempPresetValues: {
            title: "",
            id: uuidv4(),
            tempo: 120,
            iterations: 1,
            timeSignature: 4,
            sounds: {
              meas: "",
              quar: "",
              eigh: "",
              trip: "",
              sixt: "",
            },
            volume: {
              meas: -15,
              quar: -15,
              eigh: -15,
              trip: -15,
              sixt: -15,
            },
          },
          createPresetMode: false,
        };
      }
    }
    case "bpmTap": {
      const timeNow = new Date().getTime();
      let tempo;
      let timeoutId;
      if (state.secondToLastClick) {
        const difference = (timeNow - state.secondToLastClick) / 2;
        tempo = Math.floor(60000 / difference);
      }
      if (tempo > 250) tempo = 250;
      if (tempo < 30) tempo = 30;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log("fired");
        return { ...state, lastClick: null, secondToLastClick: null };
      }, 5000);
      return {
        ...state,
        secondToLastClick: state.lastClick,
        lastClick: timeNow,
        tempo: tempo ? tempo : state.tempo,
      };
    }
    case "getPrograms":
      return {
        ...state,
        programs: action.value,
      };
    case "deleteProgram": {
      const index = state.programs.findIndex(
        (program) => program.id === action.value
      );
      const newPrograms = [...state.programs];
      newPrograms.splice(index, 1);
      return {
        ...state,
        programs: newPrograms,
      };
    }
    case "deletePreset": {
      const currentProg = state.programs.find(
        (program) => program.id === state.activeProgramId
      );
      const index = currentProg.presets.findIndex(
        (preset) => preset.id === state.activePresetId
      );
      const presets = [...currentProg.presets];
      presets.splice(index, 1);
      return {
        ...state,
        programs: state.programs.map((program) =>
          program.id === state.activeProgramId
            ? {
                ...program,
                presets: presets,
              }
            : program
        ),
        activePresetId: null,
        changesMade: false,
      };
    }
    case "reorderPrograms": {
      const program = state.programs[action.dragIndex];
      const newPrograms = state.programs.filter(
        (program, idx) => idx !== action.dragIndex
      );
      // programs.splice(action.dragIndex, 1);
      newPrograms.splice(action.hoverIndex, 0, program);

      return {
        ...state,
        programs: [...newPrograms],
      };
    }
    case "reorderPresets": {
      const program = state.programs.find(
        (program) => program.id === state.activeProgramId
      );
      const preset = program.presets[action.dragIndex];
      const newPresets = program.presets.filter(
        (preset, idx) => idx !== action.dragIndex
      );
      newPresets.splice(action.hoverIndex, 0, preset);
      return {
        ...state,
        programs: state.programs.map((program) =>
          program.id === state.activeProgramId
            ? { ...program, presets: newPresets }
            : program
        ),
      };
    }
    case "updateCurrentBeat": {
      if (state.isPlaying) {
        if (!state.programMode) {
          if (state.currentBeat >= state.beatsPerMeasure) {
            console.log("mas");
            return {
              ...state,
              currentBeat: 1,
            };
          } else
            return {
              ...state,
              currentBeat: state.currentBeat + 1,
            };
        } else {
          if (state.currentBeat >= state.currentTimeSig) {
            console.log("mas");
            return {
              ...state,
              currentBeat: 1,
            };
          } else
            return {
              ...state,
              currentBeat: state.currentBeat + 1,
            };
        }
      } else {
        return {
          ...state,
          currentBeat: null,
        };
      }
    }
    case "updateProgramDisplay": {
      if (state.programMode) {
        return {
          ...state,
          currentTempo: action.tempo,
          currentTimeSig: action.timeSig,
          currentMeasures: action.measures,
        };
      }
    }
    case "updateCurrentMeasure": {
      if (state.isPlaying) {
        if (state.currentMeasure >= state.currentMeasures) {
          return {
            ...state,
            currentMeasure: 1,
          };
        } else {
          return {
            ...state,
            currentMeasure: state.currentMeasure + 1,
          };
        }
      } else {
        return {
          ...state,
          currentMeasure: null,
        };
      }
    }
    default:
      return state;
  }
};

export const ToneContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const measSound = useRef();
  const quarSound = useRef();
  const eighSound = useRef();
  const tripSound = useRef();
  const sixtSound = useRef();
  const measLoop = useRef();
  const quarLoop = useRef();
  const eighLoop = useRef();
  const tripLoop = useRef();
  const sixtLoop = useRef();

  // put this in separate component LocalStorageSync
  useEffect(() => {
    localStorage.setItem("programs", JSON.stringify(state.programs));
    if (state.activeProgramId) {
      localStorage.setItem(
        "activeProgramId",
        JSON.stringify(state.activeProgramId)
      );
    }
  }, [state.programs, state.activeProgramId]);

  // solves issue of time sig lagging 1 render behind
  useEffect(() => {
    // Tone.Transport.stop();
    if (!state.progamMode) {
      Tone.Transport.lookAhead = 100;
      Tone.Transport.timeSignature = state.beatsPerMeasure;
      Tone.Transport.bpm.value = state.tempo;
    }
    // Tone.Transport.start();
  }, [state.beatsPerMeasure, state.tempo]);

  useEffect(() => {
    measSound.current = new Tone.Player(state.measUrl).toDestination();
    quarSound.current = new Tone.Player(state.quarUrl).toDestination();
    eighSound.current = new Tone.Player(state.eighUrl).toDestination();
    tripSound.current = new Tone.Player(state.tripUrl).toDestination();
    sixtSound.current = new Tone.Player(state.sixtUrl).toDestination();

    measLoop.current = new Tone.Loop((time) => {
      measSound.current.start(time);
    }, "1m");
    quarLoop.current = new Tone.Loop((time) => {
      quarSound.current.start(time);
    }, "4n");
    eighLoop.current = new Tone.Loop((time) => {
      eighSound.current.start(time);
    }, "8n");
    tripLoop.current = new Tone.Loop((time) => {
      tripSound.current.start(time);
    }, "8t");
    sixtLoop.current = new Tone.Loop((time) => {
      sixtSound.current.start(time);
    }, "16n");
  }, [
    state.measUrl,
    state.quarUrl,
    state.eighUrl,
    state.tripUrl,
    state.sixtUrl,
    state.beatsPerMeasure,
  ]);

  useEffect(() => {
    Tone.Draw.cancel(0);
    Tone.Transport.PPQ = 24;
    Tone.Transport.scheduleRepeat((time) => {
      dispatch({ type: "updateCurrentBeat" });
    }, "4n");

    Tone.Transport.scheduleRepeat((time) => {
      const scheduleDraw = () => {
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 1 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 1 });
          }, 100);
        }, time);
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 2 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 2 });
          }, 100);
        }, "+2i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 3 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 3 });
          }, 100);
        }, "+4i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 4 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 4 });
          }, 100);
        }, "+6i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 5 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 5 });
          }, 100);
        }, "+8i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 6 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 6 });
          }, 100);
        }, "+10i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 7 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 7 });
          }, 100);
        }, "+12i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 8 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 8 });
          }, 100);
        }, "+14i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 9 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 9 });
          }, 100);
        }, "+16i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 10 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 10 });
          }, 100);
        }, "+18i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 11 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 11 });
          }, 100);
        }, "+20i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 12 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 12 });
          }, 100);
        }, "+22i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 13 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 13 });
          }, 100);
        }, "+24i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 12 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 12 });
          }, 100);
        }, "+26i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 11 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 11 });
          }, 100);
        }, "+28i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 10 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 10 });
          }, 100);
        }, "+30i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 9 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 9 });
          }, 100);
        }, "+32i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 8 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 8 });
          }, 100);
        }, "+34i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 7 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 7 });
          }, 100);
        }, "+36i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 6 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 6 });
          }, 100);
        }, "+38i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 5 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 5 });
          }, 100);
        }, "+40i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 4 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 4 });
          }, 100);
        }, "+42i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 3 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 3 });
          }, 100);
        }, "+44i");
        Tone.Draw.schedule(() => {
          dispatch({ type: "toggleActiveDrawNote", value: 2 });
          setTimeout(() => {
            dispatch({ type: "toggleActiveDrawNote", value: 2 });
          }, 100);
        }, "+46i");
      };
      scheduleDraw();
    }, "2n");
  }, [state.isPlaying]);

  useEffect(() => {
    if (state.isPlaying && !state.activeProgramId && !state.programMode) {
      Tone.start();

      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
      Tone.Transport.cancel(0);
      // Tone.Draw.cancel(0);
      measLoop.current.stop();
      quarLoop.current.stop();
      eighLoop.current.stop();
      tripLoop.current.stop();
      sixtLoop.current.stop();
    }

    if (
      state.isPlaying &&
      !state.programMode &&
      measLoop.current.state === "stopped"
    ) {
      measSound.current.volume.value = state.measVol;
      quarSound.current.volume.value = state.quarVol;
      eighSound.current.volume.value = state.eighVol;
      tripSound.current.volume.value = state.tripVol;
      sixtSound.current.volume.value = state.sixtVol;
      measLoop.current.start();
      quarLoop.current.start();
      eighLoop.current.start();
      tripLoop.current.start();
      sixtLoop.current.start();
    } else if (measLoop.current.state === "started") {
      // Tone.Transport.timeSignature = state.beatsPerMeasure;
      measSound.current.volume.value = state.measVol;
      quarSound.current.volume.value = state.quarVol;
      eighSound.current.volume.value = state.eighVol;
      tripSound.current.volume.value = state.tripVol;
      sixtSound.current.volume.value = state.sixtVol;
    }

    if (state.measVol === -50) {
      measSound.current.mute = true;
    } else {
      measSound.current.mute = false;
    }
    if (state.quarVol === -50) {
      quarSound.current.mute = true;
    } else {
      quarSound.current.mute = false;
    }
    if (state.eighVol === -50) {
      eighSound.current.mute = true;
    } else {
      eighSound.current.mute = false;
    }
    if (state.tripVol === -50) {
      tripSound.current.mute = true;
    } else {
      tripSound.current.mute = false;
    }
    if (state.sixtVol === -50) {
      sixtSound.current.mute = true;
    } else {
      sixtSound.current.mute = false;
    }
  }, [
    // state.tempo,
    state.isPlaying,
    // state.beatsPerMeasure,
    state.programMode,
    state.measVol,
    state.quarVol,
    state.eighVol,
    state.tripVol,
    state.sixtVol,
    state.activeProgramId,
  ]);

  const length = (item) => {
    switch (item) {
      case "meas":
        return ["1m"];
      case "quar":
        return ["4n", 1];
      case "eigh":
        return ["8n", 2];
      case "trip":
        return ["8t", 3];
      case "sixt":
        return ["16n", 4];
      default:
        return null;
    }
  };

  useEffect(() => {
    if (state.activeProgramId && state.programMode && state.isPlaying) {
      Tone.start();

      // schedule the beat display increment
      Tone.Transport.scheduleRepeat((time) => {
        dispatch({ type: "updateCurrentBeat" });
      }, "4n");
      // schedule the measure display increment
      Tone.Transport.scheduleRepeat((time) => {
        dispatch({ type: "updateCurrentMeasure" });
      }, "1m");

      const activeProgram = state.programs.find(
        (program) => program.id === state.activeProgramId
      );
      let runningTotalIterations = 0;
      const startMeasures = activeProgram.presets.map(({ iterations }, i) => {
        let result = runningTotalIterations;
        runningTotalIterations += iterations;
        return i === 0 ? 0 + 0.05 : result;
      });

      Tone.Transport.schedule((time) => {
        Tone.Transport.stop();
        console.log("stop");
        dispatch({ type: "stop" });
        dispatch({ type: "resetCurrentBeat" });
      }, runningTotalIterations + "m");
      console.log(runningTotalIterations);

      activeProgram.presets.map((preset, i) => {
        Tone.Transport.schedule((time) => {
          console.log(preset);
          dispatch({
            type: "updateProgramDisplay",
            tempo: preset.tempo,
            timeSig: preset.timeSignature,
            measures: preset.iterations,
          });
          Tone.Transport.bpm.value = preset.tempo;
          Tone.Transport.timeSignature = preset.timeSignature;
        }, startMeasures[i] + "m");

        const players = new Tone.Players({
          meas: preset.sounds.meas,
          quar: preset.sounds.quar,
          eigh: preset.sounds.eigh,
          trip: preset.sounds.trip,
          sixt: preset.sounds.sixt,
        }).toDestination();
        players.player("meas").volume.value = preset.volume.meas;
        players.player("quar").volume.value = preset.volume.quar;
        players.player("eigh").volume.value = preset.volume.eigh;
        players.player("trip").volume.value = preset.volume.trip;
        players.player("sixt").volume.value = preset.volume.sixt;

        return Object.keys(preset.sounds).forEach((sound) => {
          let loop = new Tone.Loop((time) => {
            players.player(sound).start(time);
          }, length(sound)[0]);
          loop.iterations =
            sound === "meas"
              ? preset.iterations
              : preset.iterations * preset.timeSignature * length(sound)[1];
          loop.start(startMeasures[i] + "m");
        });
      });
      Tone.Transport.lookahead = 100;
      Tone.Transport.start();
    } else if (!state.activeProgramId && state.programMode) {
      Tone.Transport.cancel(0);
      Tone.Transport.stop();
    }
  }, [
    state.isPlaying,
    state.activeProgramId,
    // state.programs,
    state.programMode,
    // state.currentBeat,
  ]);

  const methods = {
    // handleToggle: () => {
    //   Tone.Transport.cancel(0);
    // },
    handleSelectProgram: (e) => {
      if (state.activeProgramId === e.target.id) {
        console.log("already have this id");
      } else {
        const activeProgram = state.programs.find(
          (program) => program.id === e.target.id
        );
        console.log(activeProgram);
        dispatch({ type: "selectProgram", value: activeProgram.id });
      }
    },
    handleCreateProgram: () => {
      const program = {
        title: "",
        id: uuidv4(),
        presets: [],
      };
      dispatch({ type: "addProgram", value: program });
    },
    handleCancelNewPreset: () => {
      dispatch({ type: "createPreset" });
      dispatch({ type: "resetTempPresetValues" });
    },
    getPresetValue: (property) => {
      const progIdx = state.programs.findIndex(
        (program) => program.id === state.activeProgramId
      );
      const presIdx = state.programs[progIdx].presets.findIndex(
        (preset) => preset.id === state.activePresetId
      );
      return state.programs[progIdx].presets[presIdx][property];
    },
    getNestedPresetValue: (parent, child) => {
      const progIdx = state.programs.findIndex(
        (program) => program.id === state.activeProgramId
      );
      const presIdx = state.programs[progIdx].presets.findIndex(
        (preset) => preset.id === state.activePresetId
      );
      return state.programs[progIdx].presets[presIdx][parent][child];
    },
    moveProgramBar: (dragIndex, hoverIndex) => {
      dispatch({
        type: "reorderPrograms",
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });
    },
    movePresetBox: (dragIndex, hoverIndex) => {
      dispatch({
        type: "reorderPresets",
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });
    },
  };

  return (
    <StateContext.Provider value={[{ ...state, ...methods }, dispatch]}>
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </StateContext.Provider>
  );
};
