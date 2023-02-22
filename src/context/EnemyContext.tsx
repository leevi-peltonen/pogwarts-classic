import React, { ReactNode, createContext, useState } from "react";
import { IEnemy } from "../models/enemy";

const defaultEnemy: IEnemy = {
    name: "",
    level: 1,
    health: 50,
    attack: 10,
    defense: 5,
    isAlive: true
}

export interface IEnemyContext {
    enemy: IEnemy,
    setEnemy: (cb: (enemy: IEnemy) => IEnemy) => void | ((e: IEnemy) => void)
};

export const EnemyContext = createContext<IEnemyContext | null>(null);

interface IEnemyProvider {
  children: ReactNode;
}

const EnemyProvider: React.FC<IEnemyProvider> = ( {children} ) => {
  const [enemy, setEnemy] = useState<IEnemy>(defaultEnemy);

  return(
    <EnemyContext.Provider value={{ enemy, setEnemy}}>
      {children}
    </EnemyContext.Provider>
  )
}
export default EnemyProvider;
