import axios from "axios"
import { IPlayer } from "../models/player"

const URL  = process.env.REACT_APP_API_URL + "/users/"




export const getEquippedWeapon = async (userId: String) => {
  return await axios.get(URL + userId + '/equipped-weapon')
}

export const updateCoins = async (userId: String, coins: Number) => {
  return await axios.patch(URL + userId + '/coins', {coins: coins})
}

export const updateLevel = async (player: IPlayer) => {
  return await axios.patch(URL + player.id + '/level', {level: player.level})
}

export const updateXP = async (player: IPlayer) => {
  return await axios.patch(URL + player.id + '/xp', {experience: player.experience})
}