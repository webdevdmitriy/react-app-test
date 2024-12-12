import { useState } from 'react'
import './Button.css'

function Button({ text }) {
  const clicked = () => {
    console.log('clicked')
  }

  return (
    <button onClick={clicked} className="button accent">
      {text}
    </button>
  )
}

export default Button
