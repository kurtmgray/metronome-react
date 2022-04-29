import React from 'react'
import { useStateContext } from '../ToneContext'

export default function Program() {
  const [state, dispatch] = useStateContext()

  return (
    <div>
        Select a Program
        {state.programs.length ? (
            state.programs.map(program => 
                <div id={program.id} key={program.id} >
                    <p id={program.id} onClick={(e) => state.handleSelectProgram(e)}>
                        {program.title}
                    </p>
                    
                </div>
            )
        ) : (
            <p>You currently have no programs.</p>
        )}
        <button 
            id="addProgram" 
            className="addProgram"
            onClick={state.handleCreateProgram}
        >
            Add a Program
        </button>
       
        <button onClick={() => dispatch({ type: 'programMode' })}>Return to Metronome</button>
    </div>
  )
}
