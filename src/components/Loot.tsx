import React, { useState } from 'react'
import { IPlayer } from '../models/player'
import { IEnemy } from '../models/enemy'
import { Paper, Stack, Typography, Box, Button } from '@mui/material'

import { generateCoins } from '../utils/common'
import { updateCoins } from '../api/user'

interface ILootProps {
  player: IPlayer,
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void
  enemy: IEnemy
}




const Loot = (props: ILootProps) => {
  return (
    <Box>
      <Typography>You killed {props.enemy.name}</Typography>
      <Stack spacing={4} direction="row">
        <LootBox coins={generateCoins(props.enemy.level)} player={props.player} setPlayer={props.setPlayer} />
      </Stack>
    </Box>
  )
}



interface ILootBoxProps {
  player: IPlayer,
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void
  coins: number,
}

const LootBox = (props: ILootBoxProps) => {

  const [coins, setCoins] = useState(props.coins)
  const [isPickedUp, setIsPickedUp] = useState(false)

  const handlePickUpItem = () => {
    props.setPlayer(prev => ({...prev, coins: prev.coins += coins}))
    setIsPickedUp(true)
    updateCoins(props.player.id, props.player.coins)
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