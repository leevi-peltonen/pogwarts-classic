import React, { useState, useEffect } from 'react'
import { IUser } from '../../models/user'
import { IEnemy } from '../../models/enemy'
import { Paper, Stack, Typography, Box, Button } from '@mui/material'


import { generateCoins, earnXPandCheckForLevelUp } from '../../utils/common'
import { updateCoins } from '../../api/user'

interface ILootProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
  enemy: IEnemy,
  handleClose: () => void
}

const Loot = (props: ILootProps) => {
  /*
  useEffect(() => {

  }, [])
  */
  return (
    <Box>
      <Typography>You killed {props.enemy.name}</Typography>
      <Stack spacing={4}>
        <LootBox coins={generateCoins(props.enemy.level)} user={props.user} setUser={props.setUser} />
        <Button variant="contained" onClick={props.handleClose}>Close</Button>
      </Stack>
    </Box>
  )
}



interface ILootBoxProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
  coins: number,
}

const LootBox = (props: ILootBoxProps) => {

  const [coins, setCoins] = useState(props.coins)
  const [isPickedUp, setIsPickedUp] = useState(false)

  const handlePickUpItem = () => {

    setIsPickedUp(true)

  }

  

  return (
    <>
      {!isPickedUp && 
        (
        <Paper sx={{ m: 1}} elevation={4}>
          <Box sx={{ width: 100, height: 100 }}>
            <Typography>Coins: {coins}</Typography>
            <Button variant="contained" onClick={handlePickUpItem} >Pick up</Button>
          </Box>
        </Paper>
        )
      }
    </>
  )
}




export default Loot