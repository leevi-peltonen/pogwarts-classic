import { Button, Stack, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { IEnemy } from '../../models/enemy'
import { IUser } from '../../models/user'
import { earnXPandCheckForLevelUp } from '../../utils/common'
import Loot from './Loot'

interface IFightProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
  enemy: IEnemy,
  handleClose: () => void,
  setLevelChange: React.Dispatch<React.SetStateAction<boolean>>;
}


const Fight = (props: IFightProps) => {

  const [playerHealth, setPlayerHealth] = useState(100)
  const [enemyHealth, setEnemyHealth] = useState(props.enemy.health)
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false)
  const [isEnemyAlive, setIsEnemyAlive] = useState(props.enemy.isAlive)
  // Watches enemy health
  useEffect(() => {
    if(enemyHealth <= 0) {
      /*
      earnXPandCheckForLevelUp(props.player, props.enemy.level * 5)
      setIsEnemyAlive(false)
      props.setLevelChange(prev => !prev)
      */
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
        <Typography>{props.user.name}</Typography>
        <Typography>Health: {playerHealth}</Typography>
        <Typography>Attack level: tulee joskus</Typography>
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
          <Loot handleClose={props.handleClose} user={props.user} setUser={props.setUser} enemy={props.enemy} />
        </>
      }


    </Stack>
  )
}


export default Fight
