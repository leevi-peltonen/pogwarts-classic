import { Button, Stack, Typography, Box } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import  { ICharacterContext, CharacterContext } from '../../context/CharacterContext'
import { IEnemy } from '../../models/enemy'
import { IUser } from '../../models/user'
import { calculateDamageToEnemy, calculateDamageToPlayer, chanceToHitTarget, earnXPandCheckForLevelUp } from '../../utils/common'
import Loot from './Loot'
import { ICharacter } from '../../models/character'
import { updateHealth } from '../../api/user'

interface IFightProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
  enemy: IEnemy,
  handleClose: () => void,
  setLevelChange: React.Dispatch<React.SetStateAction<boolean>>;
}


const Fight = ({user, setUser, enemy, handleClose, setLevelChange}: IFightProps) => {
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);

  
  const [enemyHealth, setEnemyHealth] = useState(enemy.health)
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false)
  const [isEnemyAlive, setIsEnemyAlive] = useState(enemy.isAlive)
  const [characterMaxHealth, setCharacterMaxHealth] = useState(character.maxHealth)
  const [characterMaxActionPoints, setCharacterMaxActionPoints] = useState([1,2,3,4])
  const [characterCurrentActionPoints, setCharacterCurrentActionPoints] = useState(4)

  // Watches enemy health
  useEffect(() => {
    if(enemyHealth <= 0) {
      const updatedCharacter: ICharacter = earnXPandCheckForLevelUp(character, enemy.level)
      
      setCharacter(updatedCharacter)

      setIsEnemyAlive(false)
      setLevelChange(prev => !prev)
      
    }
  }, [enemyHealth])

  //Watches character health
  useEffect(() => {
    if(character.health <= 0) {
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

    if(chanceToHitTarget(1)) {
      const damage = calculateDamageToEnemy(character.equippedWeapon)
      console.log(`You dealt ${damage} damage to ${enemy.name}`)
      setEnemyHealth(prev => prev - damage)
    }else {
      console.log(`You missed!`)
    }
    setCharacterCurrentActionPoints(prev => prev - 2)
  }
  
 

  const handleEnemyAttack = () => {
    if(chanceToHitTarget(0.5)) {
      const damageToPlayer = calculateDamageToPlayer(enemy)
      console.log(`You took ${damageToPlayer} damage from ${enemy.name}`)
      setCharacter(prev => {
        return {
          ...prev,
          health: prev.health - damageToPlayer
        }
      })
      updateHealth(character.name, character.health - damageToPlayer)
    } else {
      console.log(`${enemy.name} missed!`)
    }
  }

  const handleHeal = (amountToHeal: number) => {
    if(character.health < characterMaxHealth) {
      setCharacter(prev => {
        return {
          ...prev,
          health: prev.health + amountToHeal
        }
      })
      setCharacterCurrentActionPoints(prev => prev - 1)
    } else {
      console.log("You are at max health")
    }

  }


  return (
    <Stack direction="row" spacing={20}>
      {isEnemyAlive ? 
      <>
      <Stack spacing={4}>
        <Typography>{character.name}</Typography>
        <Typography>Health: {character.health}</Typography>
        <Stack direction="row" spacing={4}>
          {characterMaxActionPoints.map((ap, index) => {
            return <Box key={index} sx={{
              width: 20,
              height: 20,
              backgroundColor: 'green',
              borderRadius: '50%',
              border: '1px solid black',
              opacity: ap <= characterCurrentActionPoints ? 1 : 0.5
            }} ></Box>
          })}
        </Stack>
        <Button disabled={isEnemyAttacking || characterCurrentActionPoints < 2} variant="contained" onClick={handleAttack}>Attack</Button>
        <Button disabled={isEnemyAttacking || characterCurrentActionPoints < 1} variant="contained" onClick={() => handleHeal(10)}>Heal</Button>
        <Button disabled={isEnemyAttacking} variant="contained" onClick={handleNextTurn}>Next Turn</Button>
      </Stack>
      
        
          <Stack spacing={4}>
            <Typography>{enemy.name}</Typography>
            <Typography>Health: {enemyHealth}</Typography>
            <Typography>Attack level: {enemy.attack}</Typography>
            <Typography>Defense level: {enemy.defense}</Typography>
          </Stack>
          </>
        :
        <>
          <Loot handleClose={handleClose} user={user} setUser={setUser} enemy={enemy} />
        </>
      }


    </Stack>
  )
}


export default Fight
