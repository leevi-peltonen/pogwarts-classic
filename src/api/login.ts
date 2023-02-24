import axios from "axios"
import { ILogin } from "../models/login"
import { IPlayer } from "../models/player"
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

export const createUser = async (data: IUserRegister) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return await axios.post(URL, data, config)
}