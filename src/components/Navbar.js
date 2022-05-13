import React from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../ToneContext";
import metIcon from "./img/metronome.png";
export default function Navbar() {
  const [state, dispatch] = useStateContext();

  return (
    <div>
      <div className="navbar">
        <div className="navbar-link">
          <Link
            to="/"
            onClick={() => {
              dispatch({ type: "programMode", value: false });
            }}
          >
            <img src={metIcon} height="100px" alt="navLogo" />
          </Link>
        </div>
        <div className="navbar-links">
          <h3
            className="navbar-link"
            onClick={() => {
              dispatch({ type: "programMode", value: false });
            }}
          >
            <Link to="/" style={{ textDecoration: "none" }}>
              Metronome{" "}
            </Link>
          </h3>
          <h3
            className="navbar-link"
            onClick={() => {
              dispatch({ type: "programMode", value: true });
            }}
          >
            <Link to="/programs" style={{ textDecoration: "none" }}>
              Programs{" "}
            </Link>
          </h3>

          {state.activeProgramId ? (
            <h3
              className="navbar-link"
              onClick={() => {
                dispatch({ type: "programMode", value: true });
              }}
            >
              <Link to="/program">Current Program</Link>
            </h3>
          ) : null}
        </div>
      </div>
    </div>
  );
}
