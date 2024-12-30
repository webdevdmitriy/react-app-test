import styles from './JournalForm.module.css'
import Button from '../Button/Button'
import { useEffect, useReducer } from 'react'
import cn from 'classnames'
import { formReducer, INITIAL_STATE } from './JournalForm.state.js'

function JournalForm({ onSubmit }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE)
  console.log('formState: ', formState)
  const { isValid, isFormReadyToSubmit, values } = formState

  useEffect(() => {
    let timerId
    console.log('isValid: ', isValid)
    if (!isValid.date || !isValid.post || !isValid.title) {
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
        <input
          type="text"
          name="title"
          value={values.title}
          className={cn(styles['input-title'], {
            [styles['invalid']]: !isValid.title
          })}
          onChange={onChange}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="date" className={styles['form-label']} value={values.data}>
          <img src="/calendar.svg" alt="Иконка календаря" />
          <span>Дата</span>
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className={cn(styles['input'], {
            [styles['invalid']]: !isValid.date
          })}
          onChange={onChange}
        />
      </div>
      <div className={styles['form-row']}>
        <label htmlFor="tag" className={styles['form-label']} value={values.tag}>
          <img src="/folder.svg" alt="Иконка папки" />
          <span>Метки</span>
        </label>
        <input type="text" id="tag" name="tag" className={styles['input']} onChange={e => onChange(e)} />
      </div>

      <textarea
        name="post"
        id=""
        cols="30"
        rows="10"
        className={cn(styles['input'], {
          [styles['invalid']]: !isValid.post
        })}
        value={values.post}
        onChange={onChange}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  )
}

export default JournalForm
