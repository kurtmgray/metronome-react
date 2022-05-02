import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../ToneContext";
export default function Navbar() {
  const [state, dispatch] = useStateContext();

  return (
    <div>
      <div className="navbar">
        <div className="navbar-link">
          <Link to="/">
            image placeholder
            {/* <img src={} alt="navLogo" /> */}
          </Link>
        </div>
        <div className="navbar-links">
          <h3
            className="navbar-link"
            onClick={() => {
              dispatch({ type: "programMode", value: false });
              state.handleToggle();
            }}
          >
            <Link to="/">Metronome </Link>
          </h3>
          <h3
            className="navbar-link"
            onClick={() => {
              dispatch({ type: "programMode", value: true });
              state.handleToggle();
            }}
          >
            <Link to="/programs">Programs </Link>
          </h3>
          <h3
            className="navbar-link"
            onClick={() => {
              dispatch({ type: "programMode", value: true });
              state.handleToggle();
            }}
          >
            <Link
              to="/program"
              style={
                state.activeProgramId
                  ? null
                  : { pointerEvents: "none", color: "#9999" }
              }
            >
              Current Program{" "}
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
