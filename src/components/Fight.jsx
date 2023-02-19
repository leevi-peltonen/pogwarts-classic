import {
  determineAmountOfEnemies,
  generateLoot,
  performAttack,
} from "../utils/common"
import { Button } from "@mui/material"
import { usePlayer } from "../context/PlayerContext"
import { useEnemy } from "../context/EnemyContext"
import { useState } from "react"
import enemies from '../data/enemies.json'

const DEBUG_SWORD = { name: "debug_sword", damage: 10 }

const Fight = () => {
  
  const { enemy} = useEnemy()
  const ENABLE_MULTIPLE_ENEMIES = false

  const enemyAmount = determineAmountOfEnemies()

  if (enemyAmount > 1 && ENABLE_MULTIPLE_ENEMIES) {
    return (
      <>
        <p>
          You found {enemyAmount} {enemy.name}'s!
        </p>
        <EnemyDataDisplay enemy={enemy} />
      </>
    )
  }
  return (
    <>
      <EnemyDataDisplay />
    </>
  )
}

const EnemyDataDisplay = () => {
  const { player, setPlayer } = usePlayer()
  const { enemy, setEnemy } = useEnemy()


  const [health, setHealth] = useState(enemy.health)
  

  const handleAttack = () => {
    setEnemy(performAttack(player, enemy, player.equippedWeapon))
    setHealth(enemy.health)
    
  }

  const handleLooting = () => {
    const loot = generateLoot(enemy.level)
    if(window.confirm("You found " + loot.name + "! Do you want to keep it?")) {
      player.inventory.weapons.push(loot)
    }
    resurrectEnemy()
  }

  const resurrectEnemy = () => {
    setEnemy((prev) => ({...prev, health: prev.maxHealth, isAlive: true}))
  }

  if (enemy.isAlive) {
    if(enemy.health<=0) {
      enemy.isAlive = false
      return
    }
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
  if (!enemy.isAlive) {
    
    return (
      <>
        <p>You killed {enemy.name}!</p>
        <Button
          onClick={() => {
            handleLooting()
          }}
        >
          Loot the corpse!
        </Button>
      </>
    )
  }
}

export default Fight
