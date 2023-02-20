import { Button } from "@mui/material"
import React, { useState, useContext } from "react"
import { PlayerContext, IPlayerContext } from "../context/PlayerContext"
import "./Inventory.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IWeapon } from "../models/weapon";


const Inventory = () => {

  const { player } = useContext(PlayerContext) as IPlayerContext;
  const [ render, setRender ] = useState<boolean>(false)

  const handleItemEquip = (itemToEquip: IWeapon): void => {

    if (player.equippedWeapon && itemToEquip) {
      player.inventory.weapons.push(player.equippedWeapon)
      const weaponToRemove = player.inventory.weapons.find(weapon => weapon.name === itemToEquip.name)
      if (weaponToRemove) {
        let index = player.inventory.weapons.indexOf(weaponToRemove)
        if (index !== -1) {
          player.inventory.weapons.splice(index, 1);
        }
      }
    }
    player.equippedWeapon = itemToEquip
    setRender((prev: boolean) => !prev)
  }

  const handleItemSale = (itemToSell: IWeapon): void => {
    const sellPrice = Math.floor(itemToSell.price / 2)
    if (window.confirm('You will get ' + sellPrice + 'coins. \nAre you sure you want to sell ' + itemToSell.name + '?')) {
      player.inventory.coins += sellPrice;
      const weaponToRemove = player.inventory.weapons.find(weapon => weapon.name === itemToSell.name);
      if (weaponToRemove) {
        let index = player.inventory.weapons.indexOf(weaponToRemove)
        if (index !== -1) {
          player.inventory.weapons.splice(index, 1);
        }
      }
    }
    setRender((prev) => !prev)
  }
  return (
    <div>
      <h2>Equipped Gear</h2>
      <h3>Weapon: {player.equippedWeapon.name}</h3>
      <h2>Inventory</h2>
      <p><b>Coins: </b>{player.inventory.coins}</p>
      <h3>Weapons</h3>
      <InventoryGrid
        handleItemEquip={() => handleItemEquip}
        handleItemSale={() => handleItemSale}
      />
    </div>
  )
}

interface IInventoryGridProps {
  handleItemEquip: (weapon: IWeapon) => void;
  handleItemSale: (weapon: IWeapon) => void;
}

function InventoryGrid(props: IInventoryGridProps) {

  const { player } = useContext(PlayerContext) as IPlayerContext;

  return (
    <TableContainer sx={{ margin: "0 auto" }} component={Paper}>
      <Table sx={{ maxWidth: 650, margin: "0 auto" }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Damage</TableCell>
            <TableCell align="right">Rarity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Equip</TableCell>
            <TableCell align="right">Sell</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {player.inventory.weapons.map((weapon, i) => (
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
                <Button onClick={() => { props.handleItemEquip(weapon) }}>
                  Equip
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => { props.handleItemSale(weapon) }}>
                  Sell
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Inventory
