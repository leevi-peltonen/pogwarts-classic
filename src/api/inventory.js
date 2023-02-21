import axios from "axios"

const URL = process.env.REACT_APP_API_URL + "/inventory"




export const addWeaponToInventory = async (userId, weaponId) => {
  return await axios.patch(URL + '/add-weapon/' + userId + '/' + weaponId)
}

export const removeWeaponFromInventory = async (userId, weaponId) => {
  return await axios.patch(URL + '/remove-weapon/' + userId + '/' + weaponId)
}

export const equipWeapon = async (userId, weaponId) => {
  return await axios.patch(URL + '/equip/' + userId + '/' + weaponId)
}