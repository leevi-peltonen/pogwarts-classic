import React, { useState, useEffect, useContext, SetStateAction } from 'react'
import { IUser } from '../../models/user'
import { IEnemy } from '../../models/enemy'
import { Paper, Stack, Typography, Box, Button } from '@mui/material'
import { IWeapon } from '../../models/weapon'

import { generateCoins, earnXPandCheckForLevelUp } from '../../utils/common'
import { updateCoinsAsync } from '../../api/user'
import { generateLootableWeapon } from '../../api/items'
import { CharacterContext, ICharacterContext } from '../../context/CharacterContext'
import { lootWeapon } from '../../api/inventory'
import { WEAPON_CHANCE } from '../../utils/configuration'

interface ILootProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
  enemy: IEnemy,
  handleClose: () => void
}

const Loot = (props: ILootProps) => {
  const [lootWeapon, setLootWeapon] = useState<IWeapon | null>(null)
  useEffect(() => {

    async function generateLoot() {
      const lootWeapon: IWeapon = await generateLootableWeapon(props.enemy.level)

      const rollForWeapon = Math.floor(Math.random() * 100)
      if(rollForWeapon < WEAPON_CHANCE) {
        setLootWeapon(lootWeapon)
      }
    }
    generateLoot()

    
  }, [])
  
  return (
    <Box>
      <Typography>You killed {props.enemy.name}</Typography>
      <Stack spacing={4}>
        
        {lootWeapon ? <LootBox lootWeapon={lootWeapon} setLootWeapon={setLootWeapon}  coins={null} user={props.user} setUser={props.setUser}  /> : <LootBox setLootWeapon={setLootWeapon}  lootWeapon={lootWeapon} coins={generateCoins(props.enemy.level)} user={props.user} setUser={props.setUser} />}
        <Button variant="contained" onClick={props.handleClose}>Close</Button>
      </Stack>
    </Box>
  )
}

export const rarityColors = {
  Common: "#808080",
  Uncommon: "#00FF00",
  Rare: "#0000FF",
  Epic: "#800080",
  Legendary: "#FFA500"
}

interface ILootBoxProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
  coins: number | null,
  lootWeapon: IWeapon | null,
  setLootWeapon: React.Dispatch<React.SetStateAction<IWeapon | null>>;
}

const LootBox = (props: ILootBoxProps) => {

  const [coins, setCoins] = useState(props.coins)
  const [isPickedUp, setIsPickedUp] = useState(false)
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);
  const handlePickUpItem = async () => {

    if(props.lootWeapon) {
      const updatedCharacter = await lootWeapon(props.lootWeapon, character.name)
      setCharacter(updatedCharacter)
    }
    if(props.coins) {
      const updatedCharacter = {...character}
      updatedCharacter.coins = updatedCharacter.coins + props.coins
      updateCoinsAsync(character.name, character.coins + props.coins)
      setCharacter(updatedCharacter)
    }

    props.setLootWeapon(null)
    setIsPickedUp(true)

  }

  
  if(props.lootWeapon) {
    return (
      <>
        {!isPickedUp && 
          (
          <Paper sx={{ m: 1, border: "5px solid " + rarityColors[props.lootWeapon.rarity as keyof typeof rarityColors] }} elevation={4}>
            <Box sx={{ width: 100, height: 100 }}>
              {<Typography>{props.lootWeapon.name}</Typography>}
              <Button variant="contained" onClick={handlePickUpItem} >Pick up</Button>
            </Box>
          </Paper>
          )
        }
      </>
    )
  } else if(props.coins) {
    return (
      <>
        {!isPickedUp && 
          (
          <Paper sx={{ m: 1 }} elevation={4}>
            <Box sx={{ width: 100, height: 100 }}>
              {<Typography>{props.coins} coins</Typography>}
              <Button variant="contained" onClick={handlePickUpItem} >Pick up</Button>
            </Box>
          </Paper>
          )
        }
      </>
    )
  } else {
    return (
      <></>
    )
  }
}



export default Loot