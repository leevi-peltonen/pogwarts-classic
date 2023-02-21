import React, { useContext } from "react";
import { Typography } from "@mui/material";
import { getWeaponByID } from "../../api/items";
import { useEffect } from "react";
import './MainScreen.css'
import { PlayerContext, IPlayerContext } from "../../context/PlayerContext";

const MainScreen = () => {

  const { player, setPlayer } = useContext(PlayerContext) as IPlayerContext;
  
  useEffect(() => {
    if(player) {
      getWeaponByID(player.equippedWeapon.toString())
      .then(res => {
        setPlayer(() => ({...player, equippedWeapon: res.data}))
      });
    }
  }, [player, setPlayer])

  if(player && player.id === 'asd') {
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
      <h1>Hello! Welcome to Pogwarts Classic!</h1>
    </>
  )

}

export default MainScreen