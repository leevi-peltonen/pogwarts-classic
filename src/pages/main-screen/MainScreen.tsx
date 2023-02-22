import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { Box } from '@mui/material'
import { getWeaponByID } from "../../api/items";
import { useEffect } from "react";
import './MainScreen.css'
//import { PlayerContext, IPlayerContext } from "../../context/PlayerContext";
import { IPlayer } from "../../models/player";
//import { PlayerContext, IPlayerContext } from "../../context/PlayerContext";
import Introduction from "../../components/main-screen/Introduction";

interface IMainScreenProps {
  player: IPlayer,
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void
}

const MainScreen = (props: IMainScreenProps) => {

    return (
      <>
        {props.player.id ? (
          <h1>Hello {props.player.username}! Welcome to Pogwarts Classic!</h1>
        )
        :
        (
          <Box
          display="flex"
          justifyContent="center"
          alignItems="center">
            <Introduction gameName="Pogwarts Classic" gameWorldName="Poglands" />
          </Box>
        )
        }
      </>
    )
  
}

export default MainScreen