import React from "react";
import { IQuest } from "../../models/quest";

const Quests = () => {
  return (
    <div>
      <h2>Quests</h2>
    </div>
  )
}

interface IQuestPanelProps {
  quest: IQuest
}
const QuestPanel = (props: IQuestPanelProps) => {
  return (
    <div>
      <h2>QuestPanel</h2>
    </div>
  )
}



export default Quests