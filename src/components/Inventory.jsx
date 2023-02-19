import { Button } from "@mui/material"
import { useState } from "react"
import { usePlayer } from "../context/PlayerContext"

import "./Inventory.css"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Inventory = () => {
  const { player } = usePlayer()
  const [render, setRender] = useState(false)

  const handleItemEquip = (divToEquip) => {

    if (player.equippedWeapon) {
      player.inventory.weapons.push(player.equippedWeapon)
      let index = player.inventory.weapons.indexOf(player.inventory.weapons.find(weapon => weapon.name === divToEquip.name))
      if (index !== -1) {
        player.inventory.weapons.splice(index, 1);
      }
    }
    player.equippedWeapon = divToEquip


    setRender((prev) => !prev)
  }

  const handleItemSale = (divToSell) => {
    const sellPrice = Math.floor(divToSell.price / 2)
    if (window.confirm('You will get ' + sellPrice + 'coins. \nAre you sure you want to sell ' + divToSell.name + '?')) {
      player.inventory.coins += sellPrice
      let index = player.inventory.weapons.indexOf(player.inventory.weapons.find(weapon => weapon.name === divToSell.name))
      if (index !== -1) {
        player.inventory.weapons.splice(index, 1);
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
        handledivEquip={handleItemEquip}
        handledivSale={handleItemSale}
      />
    </div>
  )
}

function InventoryGrid({ handledivEquip, handledivSale }) {

  const { player } = usePlayer()

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
            <TableCell aligh="right">Equip</TableCell>
            <TableCell aligh="right">Sell</TableCell>
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
                <Button onClick={() => { handledivEquip(weapon) }}>
                  Equip
                </Button>
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => { handledivSale(weapon) }}>
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
