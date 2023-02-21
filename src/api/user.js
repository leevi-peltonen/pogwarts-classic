import axios from "axios"

const URL = process.env.REACT_APP_API_URL + "/users/"




export const getEquippedWeapon = async (userId) => {
  return await axios.get(URL + userId + '/equipped-weapon')
}

export const updateCoins = async (userId, coins) => {
  return await axios.patch(URL + userId + '/coins', {coins: coins})
}