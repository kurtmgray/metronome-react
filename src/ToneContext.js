import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
} from "react";
import * as Tone from "tone";
import sounds from "./Sounds";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  isPlaying: false,
  tempo: Tone.Transport.bpm.value,
  beatsPerMeasure: 4,
  currentBeat: 1,
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
  activePresetId: undefined,
  activeProgramId: undefined,
  changesMade: false,
  programMode: false,
  createPresetMode: false,
  tempPresetValues: {
    id: uuidv4(),
    title: "Preset title...",
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
  programs: [
    {
      title: "Hard Coded",
      id: uuidv4(),
      presets: [
        {
          id: uuidv4(),
          title: "First",
          tempo: 160,
          iterations: 2,
          timeSignature: 4,
          sounds: {
            meas: "http://127.0.0.1:5501/sounds/boom.wav",
            quar: "http://127.0.0.1:5501/sounds/kick.wav",
            eigh: "http://127.0.0.1:5501/sounds/ride.wav",
            trip: "http://127.0.0.1:5501/sounds/snare.wav",
            sixt: "http://127.0.0.1:5501/sounds/tink.wav",
          },
          volume: {
            meas: -15,
            quar: -20,
            eigh: -15,
            trip: -11,
            sixt: -15,
          },
        },
        {
          id: uuidv4(),
          title: "Middle",
          tempo: 100,
          iterations: 1,
          timeSignature: 4,
          sounds: {
            meas: "http://127.0.0.1:5501/sounds/ride.wav",
            quar: "http://127.0.0.1:5501/sounds/boom.wav",
            eigh: "http://127.0.0.1:5501/sounds/snare.wav",
            trip: "http://127.0.0.1:5501/sounds/tink.wav",
            sixt: "http://127.0.0.1:5501/sounds/hihat.wav",
          },
          volume: {
            meas: -15,
            quar: -15,
            eigh: -15,
            trip: -15,
            sixt: -15,
          },
        },
        {
          id: uuidv4(),
          title: "Last",
          tempo: 120,
          iterations: 1,
          timeSignature: 4,
          sounds: {
            meas: "http://127.0.0.1:5501/sounds/snare.wav",
            quar: "http://127.0.0.1:5501/sounds/ride.wav",
            eigh: "http://127.0.0.1:5501/sounds/kick.wav",
            trip: "http://127.0.0.1:5501/sounds/tink.wav",
            sixt: "http://127.0.0.1:5501/sounds/snare.wav",
          },
          volume: {
            meas: -15,
            quar: -15,
            eigh: -15,
            trip: -15,
            sixt: -15,
          },
        },
      ],
    },
  ],
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
  // const setPresetValue = (property, value) => {
  //   if (property === '')

  //   return {
  //     ...state,
  //     programs: [
  //       state.programs.map(program =>
  //         program.id === state.activeProgramId
  //           ? program.presets.map(preset =>
  //             preset.id === state.activePresetId
  //               ? {...preset, [property]: value}
  //               : preset)
  //           : program
  //       )
  //     ]
  //   }
  // }
  switch (action.type) {
    case "play":
      return { ...state, isPlaying: true };
    case "stop":
      return { ...state, isPlaying: false };
    case "tempo":
      return { ...state, tempo: action.value };
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
    case "presetTitle": {
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
          title: "Preset title...",
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
      return { ...state, programs: [action.value, ...state.programs] };
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
        // tempPresetValues: {
        //   title: "Preset title...",
        //   id: uuidv4(),
        //   tempo: 120,
        //   iterations: 1,
        //   timeSignature: 4,
        //   sounds: {
        //     meas: "",
        //     quar: "",
        //     eigh: "",
        //     trip: "",
        //     sixt: "",
        //   },
        //   volume: {
        //     meas: -15,
        //     quar: -15,
        //     eigh: -15,
        //     trip: -15,
        //     sixt: -15,
        //   },
        // },
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
        activePresetId: undefined,
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
    case "programTitle":
      return {
        ...state,
        programs: state.programs.map((program) =>
          program.id === state.activeProgramId
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
            title: "Preset title...",
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

  useEffect(() => {
    measSound.current = new Tone.Player(state.measUrl, () => {
      console.log("loaded");
    }).toDestination();
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
  ]);

  useEffect(() => {
    if (state.isPlaying) {
      Tone.start();
      Tone.Transport.start();
    } else {
      Tone.Transport.cancel();
      Tone.Transport.stop();
      measLoop.current.stop();
      quarLoop.current.stop();
      eighLoop.current.stop();
      tripLoop.current.stop();
      sixtLoop.current.stop();
    }
    Tone.Transport.bpm.value = state.tempo;
    Tone.Transport.set({
      timeSignature: state.beatsPerMeasure,
    });
    Tone.Transport.lookAhead = 100;
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
      console.log("started");
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
    state.tempo,
    state.isPlaying,
    state.beatsPerMeasure,
    state.programMode,
    state.measVol,
    state.quarVol,
    state.eighVol,
    state.tripVol,
    state.sixtVol,
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
        dispatch({ type: "stop" });
      }, runningTotalIterations + "m");

      activeProgram.presets.map((preset, i) => {
        Tone.Transport.schedule((time) => {
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
            players.player(sound).start(time + ".2");
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
      Tone.Transport.cancel();
      Tone.Transport.stop();
    }
  }, [
    state.isPlaying,
    state.activeProgramId,
    state.programs,
    state.programMode,
  ]);

  const methods = {
    handleToggle: () => {
      Tone.Transport.cancel(0);
    },
    handleSelectProgram: (e) => {
      if (state.activeProgramId) {
        console.log("already have an id");
      } else {
        const activeProgram = state.programs.find(
          (program) => program.id === e.target.id
        );
        dispatch({ type: "selectProgram", value: activeProgram.id });
      }
    },
    handleCreateProgram: () => {
      const program = {
        title: "New program...",
        id: uuidv4(),
        presets: [],
      };
      dispatch({ type: "addProgram", value: program });
      // also save programs array to local storage
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
  };

  return (
    <StateContext.Provider value={[{ ...state, ...methods }, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
