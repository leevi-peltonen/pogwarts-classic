import axios from "axios"
import { ILogin } from "../models/login"
import { IUserRegister } from "../models/userRegister"

const URL = process.env.REACT_APP_API_URL + "/users"


export const getUserByName = async (username: string) => {
  return await axios.get(URL + '/' + username)
}


export const login = async (data: ILogin) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await axios.post(URL+'/login', data, config)
}

export const createUser = async (data: ILogin) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const fullData = {
    username: data.username,
    password: data.password, 
    coins: 0, 
    attributes: {str: 1, dex: 1, int: 1},
    weapons: [],
    armor: [],
    health: 100,
    availableAttributePoints: 6,
    experiencePoints: 0,
    level: 1,
    equippedWeapon: {
      _id: "63f4c6726b4f216722ac6ce8",
      name: "Basic Sword",
      description: "A classic melee weapon, used to slash and stab enemies.",
      damage: 10,
      price: 100,
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