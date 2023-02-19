import Quests from '../data/quests.json'
import './QuestList.css'

const QuestList = () => {

  return (
    <>
      <ul>
        {Object.keys(Quests).map((keyName, i) => (
          <li>
            <h3>{Quests[keyName].name}</h3>
            <p>{Quests[keyName].description}</p>
          </li>
        ))}
      </ul>
    </>
  )
}

export default QuestList