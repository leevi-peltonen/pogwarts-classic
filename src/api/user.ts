import axios from "axios"
import { ICharacter } from "../models/character"

const URL  = process.env.REACT_APP_API_URL + "/Users/"




export const getEquippedWeapon = async (userId: String) => {
  return await axios.get(URL + userId + '/equipped-weapon')
}

export const updateCoins = async (userId: String, coins: Number) => {
  return await axios.patch(URL + userId + '/coins', {coins: coins})
}

export const updateLevel = async (character: ICharacter) => {
  return await axios.patch(URL, character.level) // TODO: Change url to match api
}

export const updateXP = async (character: ICharacter) => {
  return await axios.patch(URL ,character.experience) // TODO: Change url to match api
}