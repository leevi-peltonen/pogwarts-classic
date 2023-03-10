import React, { useState, useEffect, useContext } from 'react'
//import { IPlayerContext, PlayerContext } from '../context/PlayerContext'
//import { generateShopItems } from '../utils/common'
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Button, Paper } from '@mui/material'
import { IWeapon } from '../../models/weapon'
import { IUser } from '../../models/user'
import Typography from '@mui/material/Typography'
import { ICharacterContext, CharacterContext } from '../../context/CharacterContext'
import { generateLootableWeapon } from '../../api/items'
import { lootWeapon } from '../../api/inventory'
import { updateCoinsAsync } from '../../api/user'

interface IShopProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
}

const Shop = (props: IShopProps) => {

  const [shopItems, setShopItems] = useState<IWeapon[]>([])
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);

  useEffect(() => {

    //Axios call to get shop items
    async function generateShopItems() {
      setShopItems([])
      for(let i = 0; i<5; i++){
        const weapon: IWeapon = await generateLootableWeapon(character.highestLevelOfKilledMonsters)
        setShopItems((prev) => {
          return [...prev, weapon]
        })
      }
    }
    generateShopItems()
   
  }, [character.highestLevelOfKilledMonsters])

  const handleItemPurchase = async (weapon: IWeapon) => {

    if(character.coins >= weapon.price){
      const updatedCharacter = await lootWeapon(weapon, character.name)

      updatedCharacter.coins = updatedCharacter.coins - weapon.price
      updateCoinsAsync(character.name, updatedCharacter.coins)
      setCharacter(updatedCharacter)
      setShopItems(prev => prev.filter(item => item.name !== weapon.name))
    } else {
      alert("You don't have enough coins to buy this item")
    }
  }

  return (
    <>
      <Typography variant="h4">Shop</Typography>
      <Typography>Coins: {character.coins}</Typography>
      <TableContainer sx={{ maxWidth: 800, margin: "0 auto" }} component={Paper}>
      <Table sx={{ margin: "0 auto" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Damage</TableCell>
            <TableCell align="right">Rarity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Buy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shopItems.map((weapon, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {weapon.name}
              </TableCell>
              <TableCell align="right">{weapon.damage}</TableCell>
              <TableCell align="right">{weapon.rarity}</TableCell>
              <TableCell align="right">{weapon.price}</TableCell>
              <TableCell align="right">{weapon.description}</TableCell>
              <TableCell align="right">
                <Button onClick={() => { handleItemPurchase(weapon) }}>
                  Buy
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}

export default Shop