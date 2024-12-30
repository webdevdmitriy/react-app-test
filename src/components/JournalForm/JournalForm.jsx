import styles from './JournalForm.module.css'
import Button from '../Button/Button'
import { useEffect, useReducer, useRef } from 'react'
import cn from 'classnames'
import { formReducer, INITIAL_STATE } from './JournalForm.state.js'
import Input from '../Input/Input.jsx'

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
  console.log('formState: ', formState)
  const { isValid, isFormReadyToSubmit, values } = formState
  const titleRef = useRef()
  const dateRef = useRef()
  const postRef = useRef()

  const focusError = isValid => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus()
        break
      case !isValid.date:
        dateRef.current.focus()
        break
      case !isValid.post:
        postRef.current.focus()
        break
    }
  }

  useEffect(() => {
    let timerId

    if (!isValid.date || !isValid.post || !isValid.title) {
      focusError(isValid)
      timerId = setTimeout(() => {
        console.log('Очистка состояния')
        dispatchForm({ type: 'RESET_VALIDITY' })
      }, 2000)
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [isValid])

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values)
      dispatchForm({ type: 'CLEAR' })
    }
  }, [isFormReadyToSubmit])

  const addJournalItem = e => {
    e.preventDefault()

    dispatchForm({ type: 'SUBMIT' })
  }

  const onChange = e => dispatchForm({ type: 'SET_VALUE', payload: { name: e.target.name, value: e.target.value } })

  return (
    <form className={styles['journal-form']} onSubmit={addJournalItem}>
      <div>
        <Input
          type="text"
          name="title"
          ref={titleRef}
          value={values.title}
          onChange={onChange}
          appearence="title"
          isValid={isValid.title}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']} value={values.data} ref={dateRef}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <Input type="date" name="date" id="date" onChange={onChange} isValid={isValid.date} />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']} value={values.tag}>
          <img src="/folder.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <Input type="text" id="tag" name="tag" className={styles['input']} onChange={e => onChange(e)} isValid={isValid.tag} />
      </div>

      <textarea name="post" id="" cols="30" rows="10" value={values.post} onChange={onChange} ref={postRef}></textarea>
      <Button text="Сохранить" />
    </form>
  )
}

export default JournalForm
