import React, { useState } from 'react'
import { IPlayer } from '../models/player'
import { IEnemy } from '../models/enemy'
import { Paper, Stack, Typography, Box, Grow } from '@mui/material'

interface ILootProps {
  player: IPlayer,
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void
  enemy: IEnemy
}




const Loot = (props: ILootProps) => {

  const [checked, setChecked] = useState(true);
  
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Box>
      <Typography>You killed {props.enemy.name}</Typography>
      <Stack spacing={4} direction="row">
        <Grow in={checked}>
          <LootBox/>
        </Grow>
        <Grow
                  in={checked}
                  style={{ transformOrigin: '0 0 0' }}
                  {...(checked ? { timeout: 1000 } : {})}
        >
          <LootBox/>
        </Grow>
      </Stack>
    </Box>
  )
}



interface ILootBoxProps {

}

const LootBox = (props: ILootBoxProps) => {
  return (
  <Paper sx={{ m: 1}} elevation={4}>
    <Box sx={{ width: 100, height: 100 }}>
      <Typography>loot here</Typography>
    </Box>
  </Paper>

  )
}




export default Loot