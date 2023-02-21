import axios from "axios"
import starter_items from '../data/starterItems.json'

const URL = process.env.REACT_APP_API_URL + "/users"


export const getUserByName = async (username) => {
  return await axios.get(URL + '/' + username)
}


export const login = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await axios.post(URL+'/login', data, config)
}

export const createUser = async (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const fullData = {
    ...data, 
    coins: 0, 
    attributes: {str: 1, dex: 1, int: 1},
    weapons: [],
    armor: [],
    health: 100,
    availableAttributePoints: 6,
    experiencePoints: 0,
    level: 1,
    equippedWeapon: {
      _id: "63f26a76d1a4b4aecd598965",
      name: "Basic Dagger",
      description: "A small, agile weapon that can be used for quick attacks or stealthy assassinations.",
      damage: 6,
      price: 75,
      rarity: "common"
    },
    equippedArmor: {
      _id: "63f3323842bc04db7c9f51e4",
      name: "Cloth Armor",
      description: "Basic armor made of cloth, offering minimal protection.",
      defense: 5,
      price: 50,
      rarity: "common"
    },
    highestLevelOfKilledMonsters: 0
  }

  return await axios.post(URL, fullData, config)
}