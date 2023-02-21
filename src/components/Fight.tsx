import React, { useContext, useState} from 'react';
import { generateLoot, performAttack, generateCoins } from "../utils/common";
import { Button } from "@mui/material";
import { IPlayerContext, PlayerContext } from "../context/PlayerContext";
import { IEnemyContext, EnemyContext } from "../context/EnemyContext";
import { IEnemy } from '../models/enemy';

const Fight = () => {
  return (
    <EnemyDataDisplay />
  )
}

const EnemyDataDisplay = () => {

  const { player } = useContext(PlayerContext) as IPlayerContext;
  const { enemy, setEnemy } = useContext(EnemyContext) as IEnemyContext;
  const [ health, setHealth ] = useState(enemy.health)
  
  const handleAttack = () => {
    setEnemy(() => performAttack(player, enemy, player.equippedWeapon));
    setHealth(enemy.health);
  }

  /*
  const handleLooting = () => {

    const rollForLoot = Math.random()
    if(rollForLoot < 0.3) {
      const loot = generateLoot(enemy.level)
      if(window.confirm("You found " + loot.name + "! Do you want to keep it?")) {
        player.weapons.push(loot)
      }
    }
    else {
      const coins = generateCoins(enemy.level)
      player.coins += coins
      window.alert("You found " + coins + " coins!")
    }
    resurrectEnemy();
  }
  */

  const resurrectEnemy = () => {
    setEnemy((prev: IEnemy) => ({...prev, health: prev.maxHealth, isAlive: true}))
  }

  if (enemy.isAlive) {
    if(enemy.health <= 0) {
      enemy.isAlive = false
      return <></>
    } else {
        return (
          <>
            <p>Name: {enemy.name}</p>
            <p>Health: {enemy.health}</p>
            <p>Attack: {enemy.attack}</p>
            <p>Defense: {enemy.defense}</p>
            <p>Is Alive: {enemy.isAlive.toString()}</p>
            <Button
              onClick={() => {
                handleAttack()
              }}
            >
              Attack
            </Button>
          </>
        )
      }
  }
  if (!enemy.isAlive) {
    return (
      <>
        <p>You killed {enemy.name}!</p>
        <Button
          onClick={() => {
            //handleLooting()
          }}
        >
          Loot the corpse!
        </Button>
      </>
    )
  } else {
    return <></>
  }
}

export default Fight
