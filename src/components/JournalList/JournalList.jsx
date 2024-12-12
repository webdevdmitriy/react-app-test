import CardButton from '../CardButton/CardButton.jsx'
import JournalItem from '../JournalItem/JournalItem.jsx'
import './JournalList.css'

function JournalList({ items }) {
  if (items.length === 0) {
    return <p>Записей нет, добавьте первую</p>
  }
  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className="journal-list">
      {items.sort(sortItems).map(item => (
        <CardButton key={item.id}>
          <JournalItem title={item.title} date={item.date} text={item.text} />
        </CardButton>
      ))}
    </div>
  )
}

export default JournalList
