import './App.css'
import Button from './components/Button/Button.jsx'

import LeftPanel from './layouts/LeftPanel/LeftPanel.jsx'
import Body from './layouts/Body/Body.jsx'
import Header from './components/Header/Header.jsx'
import JournalList from './components/JournalList/JournalList.jsx'
import JournalAddButton from './components/JournalAddButton/JournalAddButton.jsx'
import JournalForm from './components/JournalForm/JournalForm.jsx'
import { useState } from 'react'

function App() {
  const DATA = [
    {
      id: 1,
      title: 'Подготовка к обновлению курсов',
      date: new Date(),
      text: 'Горные походы открывают удивительные природные ландшафты'
    },
    {
      id: 2,
      title: 'Подготовка к обновлению курсов',
      date: new Date(),
      text: 'Горные походы открывают удивительные природные ландшафты'
    }
  ]

  const [items, setItems] = useState(DATA)

  const addItem = item =>
    setItems(oldItems => [
      ...oldItems,
      {
        text: item.text,
        title: item.title,
        date: new Date(item.date),
        id: Math.max(...oldItems.map(item => item.id)) + 1
      }
    ])

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={items} />
      </LeftPanel>

      <Body>
        <JournalForm onSubmit={addItem} />
      </Body>

      <Button />
    </div>
  )
}

export default App
