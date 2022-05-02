import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStateContext } from "../ToneContext";
import Metronome from "./Metronome";
import Programs from "./Programs";
import Navbar from "./Navbar";
import EditProgram from "./EditProgram";
import Program from "./Program";

export default function Main() {
  const [state, dispatch] = useStateContext();
  return (
    <div className="main">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Metronome />} />
          <Route path="/program" element={<Program />} />
          <Route path="/program/edit" element={<EditProgram />} />
          <Route path="/programs" element={<Programs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
