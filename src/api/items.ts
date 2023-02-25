import axios from "axios"
import { IWeapon } from "../models/weapon"

const URL = process.env.REACT_APP_API_URL + "/weapons/"

export const getWeaponByID = async (weapon: IWeapon) => {
  return await axios.get(URL + weapon.id)
}

export const getWeaponByName = async (weaponName: string) => {
  return await axios.post(URL + 'name', {name: weaponName})
}