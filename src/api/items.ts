import axios from "axios"

const URL = process.env.REACT_APP_API_URL
const config  = {
  headers: {
    "Content-Type": "application/json"
  }
}

export const getWeaponByName = async (weaponName: string) => {
  return await axios.post(URL + '/Weapons/name', weaponName, config)
}