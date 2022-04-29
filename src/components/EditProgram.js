import React from 'react'
import { useStateContext } from '../ToneContext'

export default function EditProgram() {
    const [state, dispatch] = useStateContext()

    return (
    <div>
        <input
            type="text"
            value={state.activeProgram.title}
            onChange={e => {dispatch({ type: "programTitle", value: e.target.value})}}
        >

        </input>
    </div>
  )
}
