import React, { createContext, useState, ReactNode } from "react";
import { IPlayer } from "../models/player";
import { starterWeapon } from "../models/weapon";
import { IInventory } from "../models/inventory";

const defaultPlayer: IPlayer = {
  name: "",
  level: 1,
  attributes: {
    strength: 1,
    dexterity: 1,
    intelligence: 1,
  },
  health: 100,
  damage: 1,
  experience: 0,
  availableAttributePoints: 10,
  equippedWeapon: starterWeapon,
  inventory: {} as IInventory
}

export interface IPlayerContext {
    player: IPlayer,
    setPlayer: (cb: (player: IPlayer) => IPlayer) => void
};

export const PlayerContext = createContext<IPlayerContext | null>(null);

interface IPlayerProvider {
  children: ReactNode;
}

const PlayerProvider: React.FC<IPlayerProvider> = ({ children }) => {
  const [player, setPlayer] = useState<IPlayer>(defaultPlayer);

  return(
    <PlayerContext.Provider value={{ player, setPlayer}}>
      {children}
    </PlayerContext.Provider>
  )
};

export default PlayerProvider;