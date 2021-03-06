import * as Tone from "tone";
import React from "react";

export const scheduleDraw = (dispatch, time, startLeft) => {
  console.log(startLeft.current);
  if (!startLeft.current) {
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
  } else {
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 13 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 13 });
      }, 100);
    }, time);
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 12 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 12 });
      }, 100);
    }, "+2i");
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 11 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 11 });
      }, 100);
    }, "+4i");
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 10 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 10 });
      }, 100);
    }, "+6i");
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 9 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 9 });
      }, 100);
    }, "+8i");
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 8 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 8 });
      }, 100);
    }, "+10i");
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 7 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 7 });
      }, 100);
    }, "+12i");
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 6 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 6 });
      }, 100);
    }, "+14i");
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 5 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 5 });
      }, 100);
    }, "+16i");
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 4 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 4 });
      }, 100);
    }, "+18i");
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 3 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 3 });
      }, 100);
    }, "+20i");
    Tone.Draw.schedule(() => {
      dispatch({ type: "toggleActiveDrawNote", value: 2 });
      setTimeout(() => {
        dispatch({ type: "toggleActiveDrawNote", value: 2 });
      }, 100);
    }, "+22i");
  }
};

export const determineTime = (i) => {
  switch (i) {
    case 1:
      return "0:0:0";
    case 2:
      return "0:0:2";
    case 3:
      return "0:0:3";
    case 4:
      return "0:0:4";
  }
};

export const length = (item) => {
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
