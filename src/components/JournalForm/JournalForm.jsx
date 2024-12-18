import styles from './JournalForm.module.css'
import cn from 'classnames'

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
    console.log('formProps: ', formProps)

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
    <form className={styles['journal-form']} action="journal-form" onSubmit={addJournalItem}>
      <div className="">
        <input type="text" name="title" className={cn(styles['input'])} />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <input type="date" name="date" className={cn(styles['input'])} />
      </div>

      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']}>
          <img src="/folder.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <input type="text" id="tag" name="tag" className={cn(styles['input'])} />
      </div>

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
