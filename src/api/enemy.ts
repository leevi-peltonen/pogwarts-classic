import axios from "axios"

const URL = process.env.REACT_APP_API_URL + "/enemy/"


export const getEnemyByID = async (enemyId: string) => {
  return await axios.get(URL + 'id' + enemyId)
}

export const getEnemyByName = async (name: string) => {
  return await axios.post(URL + 'name', {name: name})
}