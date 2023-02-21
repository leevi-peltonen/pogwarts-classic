import axios from "axios"

const URL = process.env.REACT_APP_API_URL + "/weapons/"

export const getWeaponByID = async (id) => {
  return await axios.get(URL + id)
}