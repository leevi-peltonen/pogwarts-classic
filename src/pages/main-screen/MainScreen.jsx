import { Button, ButtonGroup, Typography } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom"
import { usePlayer } from "../../context/PlayerContext";
import { getWeaponByID } from "../../api/items";
import { useEffect } from "react";
import './MainScreen.css'

const MainScreen = () => {

  const {player, setPlayer} = usePlayer()

  const setItems = () => {
    if(typeof player.equippedWeapon === "string") {
      getWeaponByID(player.equippedWeapon.toString())
      .then(res => {
        setPlayer({...player, equippedWeapon: res.data})
      })
    }
  }
  
  useEffect(() => {
    if(player) setItems()
  }, [player])

  if(!player) {
    return (
      <>
        <h1>Welcome to Pogwarts Classic!</h1>
        <Typography>Please login or signup to start your adventure!</Typography>
        <p>Info placeholders</p>
      </>
    )
  }

  return ( 
    <>
      <h1>Hello {player.username}! Welcome to Pogwarts Classic!</h1>
    </>
  )

}

export default MainScreen