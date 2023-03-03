import axios from "axios"
import { ICharacter } from "../models/character"

const URL  = process.env.REACT_APP_API_URL + "/Characters/"

const config  = {
  headers: {
    "Content-Type": "application/json"
  }
}

export const updateCoinsAsync = async (characterName: String, coins: Number) => {
  return await axios.patch(URL + 'coins/' + characterName, coins, config)
}

export const updateLevel = async (character: ICharacter) => {
  return await axios.patch(URL + 'level/' + character.name, character.level, config)
}

export const updateXP = async (character: ICharacter) => {
  return await axios.patch(URL + 'experience/' + character.name, character.experience, config)
}

export const updateHealth = async (characterName: string, characterHealth: number) => {
  const response = await axios.patch<ICharacter>(URL + 'health/' + characterName, characterHealth, config)
  return response.data
}

export const updateMaxHealth = async (character: ICharacter) => {
  const response = await axios.patch<ICharacter>(URL + 'maxhealth/' + character.name, character.maxHealth, config)
  return response.data
}