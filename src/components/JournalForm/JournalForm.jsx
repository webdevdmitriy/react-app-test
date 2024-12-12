import './JournalForm.css'

import Button from '../Button/Button.jsx'

const JournalForm = ({ onSubmit }) => {
  const addJournalItem = e => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const formProps = Object.fromEntries(formData)
    console.log('formProps: ', formProps)
    onSubmit(formProps)
  }

  return (
    <form action="journal-form" onSubmit={addJournalItem}>
      <input type="text" name="title" />
      <input type="date" name="date" />
      <input type="text" name="tag" />
      <textarea name="text" id="journal-text" cols="30" rows="10" placeholder="Текст журнала"></textarea>
      <Button text="Сохранить" />
    </form>
  )
}

export default JournalForm
