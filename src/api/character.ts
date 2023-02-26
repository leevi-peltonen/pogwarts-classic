import axios from "axios"
import { ICharacter } from "../models/character"
import { ICharacterCreate } from "../models/characterCreate"

const URL = process.env.REACT_APP_API_URL

const config  = {
  headers: {
    "Content-Type": "application/json"
  }
}

export const createCharacter = async (character: ICharacterCreate)  => {
  const response = await axios.post<ICharacter>(URL + '/Characters/create', character, config)
  return response.data
}