import React from 'react';
import Main from './components/Main';
import { ToneContext } from './ToneContext'

function App() {

  return (
    <div className="App">
        <ToneContext>
          <Main/>
        </ToneContext>
    </div>
  );
}

export default App;
