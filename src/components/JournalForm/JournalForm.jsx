import './JournalForm.css'

import Button from '../Button/Button.jsx'
import { useState } from 'react'

const JournalForm = ({ onSubmit }) => {
  const [formValidState, setFormValidState] = useState({
    title: true,
    text: true,
    date: true
  })

  const addJournalItem = e => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)

    let isFormValid = true

    if (!formProps.title?.trim().length) {
      setFormValidState(state => ({ ...state, title: false }))
      isFormValid = false
    } else {
      setFormValidState(state => ({ ...state, title: true }))
    }
    if (!formProps.text?.trim().length) {
      setFormValidState(state => ({ ...state, text: false }))
      isFormValid = false
    } else {
      setFormValidState(state => ({ ...state, text: true }))
    }
    if (!formProps.date) {
      setFormValidState(state => ({ ...state, title: false }))
      isFormValid = false
    } else {
      setFormValidState(state => ({ ...state, text: true }))
    }

    if (!isFormValid) return

    onSubmit(formProps)
  }

  return (
    <form action="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title" style={{ border: formValidState.title ? undefined : '1px solid red' }} />
      <input type="date" name="date" style={{ border: formValidState.date ? undefined : '1px solid red' }} />
      <input type="text" name="tag" />
      <textarea
        name="text"
        id="journal-text"
        cols="30"
        rows="10"
        placeholder="Текст журнала"
        style={{ border: formValidState.text ? undefined : '1px solid red' }}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  )
}

export default JournalForm
