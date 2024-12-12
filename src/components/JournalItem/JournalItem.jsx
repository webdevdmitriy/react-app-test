
import './JournalItem.css'

function JournalItem({title, date, text}) {
    const formatedDate = new Intl.DateTimeFormat('ru-RU').format(date)


    return (
        <div className="journal-item">
            <h2 className="journal-item__header">{title}</h2>
            <div className="journal-item__body">
                <div className="journal-item__date">{formatedDate}</div>
                <div className="journal-item__text">{text}</div>
            </div>
        </div>
    )
}

export default JournalItem