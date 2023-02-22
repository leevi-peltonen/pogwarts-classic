import React, { useContext } from "react";
import { Box } from '@mui/material'
import { getWeaponByID } from "../../api/items";
import { useEffect } from "react";
import './MainScreen.css'
import { PlayerContext, IPlayerContext } from "../../context/PlayerContext";
import Introduction from "../../components/main-screen/Introduction";

const MainScreen = () => {

  const { player, setPlayer } = useContext(PlayerContext) as IPlayerContext;
  /*
  useEffect(() => {
    if(player) {
      getWeaponByID(player.equippedWeapon.toString())
      .then(res => {
        setPlayer(() => ({...player, equippedWeapon: res.data}))
      });
    }
  }, [player, setPlayer])*/

  if(player && player.id === 'asd') {
    return (
      <Box
      display="flex"
      justifyContent="center"
      alignItems="center">
        <Introduction gameName="Pogwarts Classic" gameWorldName="Poglands" />
      </Box>
    )
  }

  return ( 
    <>
      <h1>Hello! Welcome to Pogwarts Classic!</h1>
    </>
  )

}

export default MainScreen