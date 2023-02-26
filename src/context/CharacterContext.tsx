import React, { createContext, useState, useEffect, ReactNode } from "react";
import { ICharacter } from "../models/character";
import { IUser } from "../models/user";

export interface ICharacterContext {
  character: ICharacter;
  setCharacter: React.Dispatch<React.SetStateAction<ICharacter>>;
}

export const CharacterContext = createContext<ICharacterContext>({
  character: {} as ICharacter,
  setCharacter: () => {}
})

interface ICharacterProviderProps {
  children: ReactNode;
}
export const CharacterProvider = ({ children }: ICharacterProviderProps) => {
  const [character, setCharacter] = useState<ICharacter>({} as ICharacter)



  return (
    <CharacterContext.Provider value={{ character, setCharacter }}>
      {children}
    </CharacterContext.Provider>
  )

}