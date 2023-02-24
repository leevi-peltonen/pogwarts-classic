import { Button, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { IEnemy } from '../../models/enemy'
import { IPlayer } from '../../models/player'
import { earnXPandCheckForLevelUp } from '../../utils/common'
import Loot from './Loot'

interface IFightProps {
  player: IPlayer,
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void
  enemy: IEnemy,
  handleClose: () => void,
  setLevelChange: React.Dispatch<React.SetStateAction<boolean>>;
}


const Fight = (props: IFightProps) => {

  const [playerHealth, setPlayerHealth] = useState(props.player.health)
  const [enemyHealth, setEnemyHealth] = useState(props.enemy.health)
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false)
  const [isEnemyAlive, setIsEnemyAlive] = useState(props.enemy.isAlive)
  // Watches enemy health
  useEffect(() => {
    if(enemyHealth <= 0) {
      earnXPandCheckForLevelUp(props.player, props.enemy.level * 5)
      setIsEnemyAlive(false)
      props.setLevelChange(prev => !prev)
    }
  }, [enemyHealth])

  //Watches player health
  useEffect(() => {
    if(playerHealth <= 0) {
        
    }
  }, [playerHealth])

  const handleAttack = () => {
    //TODO
    //calculate damage to enemy
    setEnemyHealth(prev => prev - 20)
    
    setIsEnemyAttacking(true)
    setTimeout(() => {
      //TODO
      //calculate damage to player
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
          <Loot handleClose={props.handleClose} player={props.player} setPlayer={props.setPlayer} enemy={props.enemy} />
        </>
      }


    </Stack>
  )
}


export default Fight
