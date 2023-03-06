import axios from "axios"
import { IAchievement } from "../models/achievement"
import { ICharacter } from "../models/character"

const URL = process.env.REACT_APP_API_URL

const config  = {
  headers: {
    "Content-Type": "application/json"
  }
}

export const addAchievementAsync = async (characterName: string, achievementId: number) => {
  const response = await axios.post<ICharacter>(URL + '/Achievement/' + achievementId, characterName, config)
  return response.data
}

export const getAllAchievementsAsync = async () => {
  const response = await axios.get<IAchievement[]>(URL + '/Achievement')
  return response.data
}