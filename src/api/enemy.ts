import axios from "axios"
import { IEnemy } from "../models/enemy"

const URL = process.env.REACT_APP_API_URL + "/Enemies/"


export const getEnemyByID = async (enemyId: string) => {
  return await axios.get(URL + 'id' + enemyId)
}

export const getEnemyByName = async (name: string) => {
  return await axios.post(URL + 'name', {name: name})
}

export const getAllEnemies = async () => {
  const response = await axios.get<IEnemy[]>(URL)
  return response.data
}