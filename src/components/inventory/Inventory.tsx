import { Button } from "@mui/material"
import React, { useState, useContext, useEffect } from "react"
//import { PlayerContext, IPlayerContext } from "../context/PlayerContext"
import "./Inventory.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { IWeapon } from "../../models/weapon";
import { IUser } from "../../models/user";
import { ICharacter } from "../../models/character"
import { ICharacterContext, CharacterContext } from "../../context/CharacterContext";
import { equipWeaponAsync } from "../../api/inventory";
import { rarityColors } from "../battle/Loot";
interface IInventoryProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
}

const Inventory = (props: IInventoryProps) => {

  const [loading, setLoading] = useState(false)
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);

  const handleItemEquip = async (itemToEquip: IWeapon) => {
    setLoading(true)
    const newCharacter = await equipWeaponAsync(character.name, itemToEquip.name)
    setCharacter(newCharacter)
    setLoading(false)
  }


  const handleItemSale = async (itemToSell: IWeapon) => {
    
    
  }

  return (
    <div>
      <Box sx={{ maxWidth: 800, margin: "0 auto", padding: '50px' }}>
        <Grid container>
          <Grid xs={6}>
            <Typography>Equipped Weapon: {character.equippedWeapon ? character.equippedWeapon?.name : 'None'}</Typography>
          </Grid>
          <Grid xs={6}>
            <Typography>Equipped Armor: {character.equippedArmor ? character.equippedArmor?.name : 'None'}</Typography>
          </Grid>
        </Grid>
      </Box>
      {loading ? <p>Loading...</p> : <InventoryGrid
        handleItemEquip={handleItemEquip}
        handleItemSale={handleItemSale}
        user={props.user}
        setUser={props.setUser}
      />}
    </div>
  )
}

interface IInventoryGridProps {
  handleItemEquip: (weapon: IWeapon) => void;
  handleItemSale: (weapon: IWeapon) => void;
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
}

function InventoryGrid(props: IInventoryGridProps) {
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);
  const headers = ["Name", "Damage", "Rarity", "Price", "Description", "Equip", "Sell"]
  //const [isAscending, setIsAscending] = useState<boolean>(true)

  // const handleAscendingSort = (condition: string) => {
    
  //     const sortedArray = player.weapons.sort((a, b) => a[condition.toLowerCase() as keyof typeof a] as number - b[condition.toLowerCase() as keyof typeof b] as number)
  //     setPlayer(prev => ({...prev,  weapons: sortedArray}))
  //     setIsAscending(prev => !prev)
  // }

  // const handleDescendingSort = (condition: string) => {
  //   const sortedArray = player.weapons.sort((a, b) => b[condition.toLowerCase()] - a[condition.toLowerCase()])
  //   setPlayer(prev => ({...prev, weapons: sortedArray}))
  //   setIsAscending(prev => !prev)
  // }
  


  const handleHeal = () => {
    setCharacter(prev => ({ ...prev, health: prev.maxHealth }))
    alert("You have been healed!")
  }
  

  return (
    <>
      <Button variant="contained" color="success" onClick={handleHeal} >Heal</Button>
      <TableContainer sx={{ maxWidth: 800, margin: "0 auto" }} component={Paper}>
        <Table sx={{ margin: "0 auto" }}>
          <TableHead>
            <TableRow>
              {/*
              <TableCell >Name</TableCell>
              <TableCell >Damage</TableCell>
              <TableCell align="right">Rarity</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell aligh="right">Equip</TableCell>
              <TableCell aligh="right">Sell</TableCell>
              */}
              {headers.map((header, i) => {
                return (
                  //<TableCell onClick={(event) => {isAscending ? handleDescendingSort(event.target.innerHTML) : handleAscendingSort(event.target.innerHTML) }} key={i} >{header}</TableCell>
                  <TableCell key={i}>{header}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {character.inventoryWeapons && character.inventoryWeapons.map((weapon, i) => (
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
      
    </>
  )
}

export default Inventory
