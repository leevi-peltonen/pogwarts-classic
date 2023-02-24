import { Button, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { IEnemy } from '../models/enemy'
import { IPlayer } from '../models/player'
import { calculateDamage } from '../utils/common'
import Loot from './Loot'

interface IFightProps {
  player: IPlayer,
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void
  enemy: IEnemy
}


const Fight = (props: IFightProps) => {

  const [playerHealth, setPlayerHealth] = useState(props.player.health)

  const [enemyHealth, setEnemyHealth] = useState(props.enemy.health)
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false)
  const [isEnemyAlive, setIsEnemyAlive] = useState(props.enemy.isAlive)

  useEffect(() => {
    if(enemyHealth <= 0) setIsEnemyAlive(false)
  }, [enemyHealth])



  const handleAttack = () => {
    //TODO
    //calculate damage to enemy
    // actions when enemyHealth <= 0
    setEnemyHealth(prev => prev - 20)

    if(enemyHealth <= 0) setIsEnemyAlive(false)

    setIsEnemyAttacking(true)
    setTimeout(() => {
      //TODO
      //calculate damage to player
      // acitions if player health <= 0
      setIsEnemyAttacking(false)
    }, 1000)
  }


  return (
    <Stack direction="row" spacing={20}>
      {isEnemyAlive ? 
      <>
      <Stack spacing={4}>
        <Typography>{props.player.username}</Typography>
        <Typography>Health: {playerHealth}</Typography>
        <Typography>Attack level: {props.player.damage}</Typography>
        <Typography>Defense level: tulee joskus</Typography>
        <Button disabled={isEnemyAttacking} variant="contained" onClick={handleAttack}>Attack</Button>
      </Stack>
      
        
          <Stack spacing={4}>
            <Typography>{props.enemy.name}</Typography>
            <Typography>Health: {enemyHealth}</Typography>
            <Typography>Attack level: {props.enemy.attack}</Typography>
            <Typography>Defense level: {props.enemy.defense}</Typography>
          </Stack>
          </>
        :
        <>
          <Loot player={props.player} setPlayer={props.setPlayer} enemy={props.enemy} />
        </>
      }


    </Stack>
  )
}


export default Fight
