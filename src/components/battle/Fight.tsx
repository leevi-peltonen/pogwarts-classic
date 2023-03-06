import { Button, Stack, Typography, Box } from "@mui/material"
import React, { useState, useEffect, useContext } from "react"
import {
  ICharacterContext,
  CharacterContext,
} from "../../context/CharacterContext"
import { IEnemy } from "../../models/enemy"
import { IUser } from "../../models/user"
import {
  calculateDamageToEnemy,
  calculateDamageToPlayer,
  chanceToHitTarget,
  checkForLevelAchievements,
  earnXPandCheckForLevelUp,
} from "../../utils/common"
import Loot from "./Loot"
import { ICharacter } from "../../models/character"
import { updateHealth } from "../../api/user"
import { ENEMY_HIT_CHANCE, PLAYER_HIT_CHANCE } from "../../utils/configuration"
import MessageContainer from "../world-bosses/MessageContainer"
import { IMessage } from "../../pages/world-bosses/WorldBosses"

interface IFightProps {
  user: IUser
  setUser: (cb: (user: IUser) => IUser) => void
  enemy: IEnemy
  handleClose: () => void
  setLevelChange: React.Dispatch<React.SetStateAction<boolean>>
}

const Fight = ({
  user,
  setUser,
  enemy,
  handleClose,
  setLevelChange,
}: IFightProps) => {
  const { character, setCharacter } =
    useContext<ICharacterContext>(CharacterContext)

  const [enemyHealth, setEnemyHealth] = useState(enemy.health)
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false)
  const [isEnemyAlive, setIsEnemyAlive] = useState(enemy.isAlive)
  const [characterMaxHealth, setCharacterMaxHealth] = useState(
    character.maxHealth
  )
  const [characterMaxActionPoints, setCharacterMaxActionPoints] = useState([
    1, 2, 3, 4,
  ])
  const [characterCurrentActionPoints, setCharacterCurrentActionPoints] =
    useState(4)
  
  const [messages, setMessages] = useState<IMessage[]>([])

  // Watches enemy health
  useEffect(() => {
    if (enemyHealth <= 0) {
      const updatedCharacter: ICharacter = earnXPandCheckForLevelUp(
        character,
        enemy.level
      )
      setCharacter(updatedCharacter)
      setIsEnemyAlive(false)
      setLevelChange((prev) => !prev)
    }
  }, [enemyHealth])

  // Watches character level
  useEffect(() => {
    async function checkLevelAchievements() {
      const checkedCharacter = await checkForLevelAchievements(character)
      setCharacter(checkedCharacter)
    }checkLevelAchievements()
  }, [character.level])


  //Watches character health
  useEffect(() => {
    if (character.health <= 0) {
      //TODO: Handle loss of items and/or coins
      handleClose()
    }
  }, [character.health])

  const handleNextTurn = () => {
    setIsEnemyAttacking(true)
    setTimeout(() => {
      handleEnemyAttack()
      setIsEnemyAttacking(false)
      setCharacterCurrentActionPoints(characterMaxActionPoints.length)
    }, 1000)
  }

  const handleAttack = () => {
    if (chanceToHitTarget(PLAYER_HIT_CHANCE)) {
      const damage = calculateDamageToEnemy(character.equippedWeapon)
      setMessages((prev) => [ 
        ...prev,
        {
          message: `You dealt ${damage} damage to ${enemy.name}`,
          character: "Botwarts"
        },
      ])
      setEnemyHealth((prev) => prev - damage)
    } else {
      setMessages((prev) => [ 
        ...prev,
        {
          message: `You missed ${enemy.name}!`,
          character: "Botwarts"
        },
      ])
    }
    setCharacterCurrentActionPoints((prev) => prev - 2)
  }

  const handleEnemyAttack = () => {
    if (chanceToHitTarget(ENEMY_HIT_CHANCE)) {
      const damageToPlayer = calculateDamageToPlayer(enemy)
      setMessages((prev) => [
        ...prev,
        {
          message: `${enemy.name} attacked for ${damageToPlayer} damage!`,
          character: "Botwarts"
        },
      ])

      setCharacter((prev) => {
        return {
          ...prev,
          health: prev.health - damageToPlayer,
        }
      })
      updateHealth(character.name, character.health - damageToPlayer)
    } else {
      setMessages((prev) => [
        ...prev,
        {
          message: `${enemy.name} missed you!`,
          character: "Botwarts"
        },
      ])
    }
  }

  const handleHeal = (amountToHeal: number) => {
    if (character.health < characterMaxHealth) {

      setMessages((prev) => [
        ...prev,
        {
          message: `You healed ${amountToHeal} health`,
          character: "Botwarts"
        },
      ])

      setCharacter((prev) => {
        return {
          ...prev,
          health: prev.health + amountToHeal,
        }
      })
      setCharacterCurrentActionPoints((prev) => prev - 1)
    } else {
      setMessages((prev) => [
        ...prev,
        {
          message: `You are at max health!`,
          character: "Botwarts"
        },
      ])
    }
  }

  return (
    <Stack direction="row" spacing={20}>
      {isEnemyAlive ? (
        <>
          <Stack spacing={4}>
            <Typography>{character.name}</Typography>
            <Typography>Health: {character.health}</Typography>
            <Stack direction="row" spacing={4}>
              {characterMaxActionPoints.map((ap, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: "green",
                      borderRadius: "50%",
                      border: "1px solid black",
                      opacity: ap <= characterCurrentActionPoints ? 1 : 0.5,
                    }}
                  ></Box>
                )
              })}
            </Stack>
            <Button
              disabled={isEnemyAttacking || characterCurrentActionPoints < 2}
              variant="contained"
              onClick={handleAttack}
            >
              Attack
            </Button>
            <Button
              disabled={isEnemyAttacking || characterCurrentActionPoints < 1}
              variant="contained"
              onClick={() => handleHeal(10)}
            >
              Heal
            </Button>
            <Button
              disabled={isEnemyAttacking}
              variant="contained"
              onClick={handleNextTurn}
            >
              Next Turn
            </Button>
          </Stack>
          <Stack spacing={4}>
            <Typography>{enemy.name}</Typography>
            <Typography>Health: {enemyHealth}</Typography>
            <Typography>Attack level: {enemy.attack}</Typography>
            <Typography>Defense level: {enemy.defense}</Typography>
          </Stack>
          {/*TODO: Message container for actions in combat*/}
          <MessageContainer messages={messages} />
        </>
      ) : (
        <>
          <Loot
            handleClose={handleClose}
            user={user}
            setUser={setUser}
            enemy={enemy}
          />
        </>
      )}
    </Stack>
  )
}

export default Fight
