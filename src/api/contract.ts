import axios from "axios"
import { IContract } from "../models/contract"

const URL = process.env.REACT_APP_API_URL

export const getContractsAsync = async () => {
  const response = await axios.get<IContract[]>(URL + '/Contracts')
  return response.data
}