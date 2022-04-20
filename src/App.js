import './App.css';
import Metronome from './components/Metronome';
import React, { useState, useEffect, useMemo } from 'react';
import { AudContext } from './AudContext'

function App() {
  const [audioContext, setAudioContext] = useState(new AudioContext())
  
  const value = useMemo(() => ({audioContext, setAudioContext}), [audioContext, setAudioContext])
  
  useEffect(() => {
    setAudioContext(new AudioContext())
  }, [])

  return (
    <div className="App">
      <AudContext.Provider value={value}>  
        <Metronome />
      </AudContext.Provider>
    </div>
  );
}

export default App;
