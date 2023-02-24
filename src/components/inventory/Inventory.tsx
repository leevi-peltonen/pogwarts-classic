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
import { getWeaponByID } from "../../api/items";
import { getEquippedWeapon, updateCoins } from "../../api/user";
import { addWeaponToInventory, equipWeapon, removeWeaponFromInventory } from "../../api/inventory";
import { IWeapon } from "../../models/weapon";
import { IPlayer } from "../../models/player";

interface IInventoryProps {
  player: IPlayer,
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void
}

const Inventory = (props: IInventoryProps) => {

  const player = props.player;
  const setPlayer = props.setPlayer;
  const [render, setRender] = useState(false)
  const [equippedWeapon, setEquippedWeapon] = useState<IWeapon>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let weapons: IWeapon[] = []

      player.weapons.forEach(weapon => {
      if(typeof weapon === "string") {
        getWeaponByID(weapon)
        .then(res => {
          weapons.push(res.data)
        })
        .then(() => {
          setPlayer(() => ({...player, weapons: weapons}))
        })
      }
    })
  }, [player.weapons, player, setPlayer])


  //Retrieve player.equippedWeapon data
  useEffect(() => {
    getWeaponByID(player.equippedWeapon)
    .then(res => {
      console.log(res)
    })
  }, [])
  

  const handleItemEquip = async (itemToEquip: IWeapon) => {
    setLoading(true)
    /*
    Steps:
    1. Return the previously equipped weapon to inventory
    2. Change equippedWeapon to weaponToEquipId
    3. Remove weaponToEquipId from inventory
    */

    //1:
    returnEquippedWeaponToInventory()
    
    setRender((prev) => !prev)

    //2:
    handleEquipWeapon(itemToEquip)

    // 3:
    handleRemoveWeapon(itemToEquip)

  }

  const returnEquippedWeaponToInventory = async () => {
    
    const weapon = await getEquippedWeapon(player.id)
    // Add weapon to database inventory AND player.inventory context
    const weapons = player.weapons
    weapons.push(weapon.data)
    setRender((prev) => !prev)
    await addWeaponToInventory(player.id, weapon.data._id)
  }
  
  const handleEquipWeapon = async (weapon: IWeapon) => {
    setPlayer(() => ({...player, equippedWeapon: weapon}))
    await equipWeapon(player.id, weapon.id)
  }

  const handleRemoveWeapon = async (weapon: IWeapon) => {
    const index = player.weapons.findIndex(_wep => _wep.id === weapon.id)
    player.weapons.splice(index, 1)
    //setPlayer(prev => ({...prev, inventory: {weapons: , armor: prev.inventory.armor}}))
    setRender((prev) => !prev)

    await removeWeaponFromInventory(player.id, weapon.id)  
      .then(() => {
        setLoading(false)
      })
  }

  const handleItemSale = async (itemToSell: IWeapon) => {
    
    const sellPrice = Math.floor(itemToSell.price / 2)
    if (window.confirm('You will get ' + sellPrice + 'coins. \nAre you sure you want to sell ' + itemToSell.name + '?')) {
      setLoading(true)
      player.coins += sellPrice
      await updateCoins(player.id, player.coins)
      const weaponToRemove = player.weapons.find(weapon => weapon.name === itemToSell.name)
      if (weaponToRemove) {
        let index = player.weapons.indexOf(weaponToRemove)
        if (index !== -1) {
          player.weapons.splice(index, 1);
        }
      }
      await removeWeaponFromInventory(player.id, itemToSell.id)
      .then(() => {
        setLoading(false)
      })
    }
    setRender((prev) => !prev)
    
  }
  return (
    <div>
      <h2>Equipped Gear</h2>
      <h3>Weapon: {player.equippedWeapon.name}</h3>
      <h2>Inventory</h2>
      <p><b>Coins: </b>{player.coins}</p>
      <h3>Weapons</h3>
      {loading ? <p>Loading...</p> : <InventoryGrid
        handleItemEquip={handleItemEquip}
        handleItemSale={handleItemSale}
        player={player}
        setPlayer={setPlayer}
      />}

    </div>
  )
}

interface IInventoryGridProps {
  handleItemEquip: (weapon: IWeapon) => void;
  handleItemSale: (weapon: IWeapon) => void;
  player: IPlayer;
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void;
}

function InventoryGrid(props: IInventoryGridProps) {

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
  

  return (
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
                <TableCell key={i} >{header}</TableCell>
              )
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.player.weapons.map((weapon, i) => (
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
