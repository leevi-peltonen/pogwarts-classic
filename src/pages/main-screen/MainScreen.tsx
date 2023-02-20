import React, { useContext } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom"
import './MainScreen.css'
import { PlayerContext, IPlayerContext } from "../../context/PlayerContext";

const MainScreen = () => {

  const navigate = useNavigate()
  const { player } = useContext(PlayerContext) as IPlayerContext;

  if(!player) {
    return (
      <>
        <h1>Welcome to Pogwarts Classic!</h1>
        <Button variant="contained" onClick={() => {
          navigate('/character-creation')
        }}>Begin your pogwarts adventure!</Button>
        <p>Info placeholders</p>
      </>
    )
  }

  return ( 
    <>
      <h1>Hello {player.name}! Welcome to Pogwarts Classic!</h1>

    </>
  )

}

export default MainScreen