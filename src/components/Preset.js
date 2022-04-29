import React from 'react'
import { useStateContext } from '../ToneContext'

export default function Preset({ preset }) {
  const [state, dispatch] = useStateContext()

  return (
    <div id={preset.id}>
        <div>Title: {preset.title}</div>
        <div>Tempo: {preset.tempo}</div>
        <div>Measures: {preset.iterations}</div>
    </div>
  )
}
