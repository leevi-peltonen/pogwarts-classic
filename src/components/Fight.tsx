import { Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { IEnemy } from '../models/enemy'

interface IFightProps {
  enemy: IEnemy
}


const Fight = (props: IFightProps) => {

  const [enemyHealth, setEnemyHealth] = useState(props.enemy.health)
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false)

  const handleAttack = () => {
    //TODO
    //calculate damage to enemy
    // actions when enemyHealth <= 0
    setEnemyHealth(prev => prev - 5)
    setIsEnemyAttacking(true)
    setTimeout(() => {
      //TODO
      //calculate damage to player
      // acitions if player health <= 0
      setIsEnemyAttacking(false)
    }, 1000)
  }


  return (
    <Stack spacing={4}>
      <Typography>Health: {enemyHealth}</Typography>
      <Typography>Attack level: {props.enemy.attack}</Typography>
      <Typography>Defense level: {props.enemy.defense}</Typography>
      <Button disabled={isEnemyAttacking} onClick={handleAttack}>Attack</Button>
    </Stack>
  )
}


export default Fight
