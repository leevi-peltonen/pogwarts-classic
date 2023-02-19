import { Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom"
import { usePlayer } from "../../context/PlayerContext";

import './MainScreen.css'

const MainScreen = () => {

  const navigate = useNavigate()
  const {player} = usePlayer()


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