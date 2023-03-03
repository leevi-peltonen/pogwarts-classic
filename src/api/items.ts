import axios from "axios"
import { IWeapon } from "../models/weapon"

const URL = process.env.REACT_APP_API_URL
const config  = {
  headers: {
    "Content-Type": "application/json"
  }
}

export const getWeaponByName = async (weaponName: string) => {
  return await axios.post(URL + '/Weapons/name', weaponName, config)
}

export const generateLootableWeapon = async (difficulty: number) => {
  const response = await axios.get<IWeapon>(URL + '/Weapons/create/' + difficulty)
  return response.data
}