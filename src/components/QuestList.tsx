import React from 'react'
import Quests from '../data/quests.json'
import './QuestList.css'

const QuestList = () => {

  return (
    <>
      <ul>
        {Object.keys(Quests).map((keyName) => (
          <li>
            <h3>{Quests[keyName as keyof typeof Quests].name}</h3>
            <p>{Quests[keyName as keyof typeof Quests].description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default QuestList