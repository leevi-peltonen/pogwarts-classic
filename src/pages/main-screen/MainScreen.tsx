import { Typography } from "@mui/material";
import React, { useContext } from "react";
import { Box } from '@mui/material'
import { useEffect } from "react";
import './MainScreen.css'
//import { PlayerContext, IPlayerContext } from "../../context/PlayerContext";
import { IUser } from "../../models/user";
//import { PlayerContext, IPlayerContext } from "../../context/PlayerContext";
import Introduction from "../../components/main-screen/Introduction";

interface IMainScreenProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
}

const MainScreen = (props: IMainScreenProps) => {

    return (
      <>
        {props.user.name ? (
          <h1>Hello {props.user.name}! Welcome to Pogwarts Classic!</h1>
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