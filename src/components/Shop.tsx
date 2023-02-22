import React, { useState, useEffect, useContext } from 'react'
//import { IPlayerContext, PlayerContext } from '../context/PlayerContext'
//import { generateShopItems } from '../utils/common'
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Button, Paper } from '@mui/material'
import { IWeapon } from '../models/weapon'
import { IPlayer } from '../models/player'

interface IShopProps {
  player: IPlayer,
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void
}

const Shop = (props: IShopProps) => {

  //const { player, setPlayer } = useContext(PlayerContext) as IPlayerContext;
  const player = props.player;

  const [shopItems, setShopItems] = useState<IWeapon[]>([])

  /*
  useEffect(() => {
    setShopItems(generateShopItems(player.highestLevelOfKilledMonsters))
  }, [player.highestLevelOfKilledMonsters])
  */

  const handleItemPurchase = (item: IWeapon) => {

    if(player.coins >= item.price) {
      const weaponToPurchase = shopItems.find(weapon => weapon.name === item.name)
      if (weaponToPurchase) {
        let index = shopItems.indexOf(weaponToPurchase)
        if (index !== -1) {
          setShopItems(shopItems.filter(_item => _item.name !== item.name))
          player.weapons.push(item)
          player.coins -= item.price
        }
      }
    } else {
      window.alert('You dont have enough coins!')
    }
  }

  return (
    <>
      <h2>Hello, what can I get you?</h2>
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