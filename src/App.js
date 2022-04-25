import React from 'react';
import Metronome from './components/Metronome';
import { ToneContext } from './ToneContext'

function App() {

  return (
    <div className="App">
        <ToneContext>
          <Metronome/>
        </ToneContext>
    </div>
  );
}

export default App;
