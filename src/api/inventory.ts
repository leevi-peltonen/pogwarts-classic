import axios from "axios"
import { ICharacter } from "../models/character"
import { IWeapon } from "../models/weapon"
const URL = process.env.REACT_APP_API_URL

const config  = {
  headers: {
    "Content-Type": "application/json"
  }
}

export const equipWeaponAsync = async (characterName: string, weaponName: string) => {
  const response = await axios.patch<ICharacter>(URL + '/Characters/equip/weapon/' + characterName, weaponName, config)
  return response.data
}

export const lootWeapon = async (weapon: IWeapon, characterName: string) => {
  const response = await axios.patch<ICharacter>(URL + '/Characters/weapon/loot/' + characterName, weapon, config)
  return response.data
}