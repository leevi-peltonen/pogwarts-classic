import axios from "axios"
import { IUser } from "../models/user"
import { IUserLogin } from "../models/userLogin"
import { IUserRegister } from "../models/userRegister"

const URL = process.env.REACT_APP_API_URL + "/Users"
const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const getUserByName = async (username: string) => {
  return await axios.get(URL + '/' + username)
}


export const login = async (data: IUserLogin) => {
  const response = await axios.post<IUser>(URL+'/login', data, config)
  return response.data
}

export const createUser = async (data: IUserRegister) => {

  console.log(data)
  return await axios.post(URL + '/register', {name: data.name, password: data.password}, config)
}