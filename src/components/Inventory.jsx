import { Button } from "@mui/material"
import { useState } from "react"
import { usePlayer } from "../context/PlayerContext"

import "./Inventory.css"

const Inventory = () => {
  const { player } = usePlayer()
  const [render, setRender] = useState(false)

  const handleItemEquip = (itemToEquip) => {

    if(player.equippedWeapon) {
      player.inventory.weapons.push(player.equippedWeapon)
      let index = player.inventory.weapons.indexOf(player.inventory.weapons.find(weapon => weapon.name === itemToEquip.name))
      if (index !== -1) {
        player.inventory.weapons.splice(index, 1);
      }
    }
    player.equippedWeapon = itemToEquip

    
    setRender((prev) => !prev)
  }

  const handleItemSale = (itemToSell) => {
    const sellPrice = Math.floor(itemToSell.price / 2)
    if(window.confirm('You will get '+ sellPrice + 'coins. \nAre you sure you want to sell ' + itemToSell.name + '?')) {
      player.inventory.coins += sellPrice
      let index = player.inventory.weapons.indexOf(player.inventory.weapons.find(weapon => weapon.name === itemToSell.name))
      if (index !== -1) {
        player.inventory.weapons.splice(index, 1);
      }
    }
    setRender((prev) => !prev)
  }
  return (
    <>
      <h2>Equipped Gear</h2>
      <h3>Weapon: {player.equippedWeapon.name}</h3>
      <h2>Inventory</h2>
      <p><b>Coins: </b>{player.inventory.coins}</p>
      <h3>Weapons</h3>
      <ul>
        {player &&
          player.inventory.weapons.map((weapon, i) => {
            return (
              <>
                <li
                  key={i}
                  className="itembox"
                  onClick={() => {
                    handleItemEquip(weapon)
                  }}
                >
                  {weapon.name} <br /> {weapon.description} <br /> Damage:{" "}
                  {weapon.damage}
                </li>
                <Button onClick={() => {handleItemSale(weapon)}}>Sell Item</Button>
              </>
            )
          })}
      </ul>
    </>
  )
}

export default Inventory
