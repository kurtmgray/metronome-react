import React from 'react'
import { useStateContext } from '../ToneContext'
import Metronome from './Metronome'
import Programs from './Programs'
import CreatePreset from './CreatePreset'
import EditPreset from './EditPreset'
import Program from './Program'

export default function Main() {
    const [state, dispatch] = useStateContext()
    return (
    <div>
      {!state.createPresetMode && !state.programMode && <Metronome/>}
      {state.programMode && !state.activeProgram && <Programs/>}
      {state.programMode && state.activeProgram && <Program />}  
    </div>
  )
}
