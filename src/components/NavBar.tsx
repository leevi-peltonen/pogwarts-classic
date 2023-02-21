import { useNavigate } from "react-router-dom"
import {AppBar, Toolbar, IconButton, Typography, Stack, Button} from '@mui/material'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import React, { useContext } from "react"
import { PlayerContext, IPlayerContext } from "../context/PlayerContext"

const NavBar = (): JSX.Element => {
  
  const { player } = useContext(PlayerContext) as IPlayerContext;

  const navigate = useNavigate()

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
            <AutoFixHighIcon/>
          </IconButton>
          <Typography variant='h6' component='div' sx={{flexGrow: 1}}>
            Pogwarts Classic
          </Typography>
          <Stack direction="row" spacing={2}>
            {player && player.id === 'asd' ?          
            <>
              <Button variant="contained" onClick={() => navigate('/signup')}>Sign up!</Button>
              <Button variant="contained" onClick={() => navigate('/login')}>Log in!</Button>
            </> 
            : 
            <>
              <Button onClick={() => navigate('/battle')} color="inherit">Battle</Button>
              <Button onClick={() => navigate('/player-inventory')} color="inherit">Inventory</Button>
              <Button onClick={() => navigate('/shop')} color="inherit">Shop</Button>
            </>
            }
          </Stack>
        </Toolbar>
      </AppBar>
    )
}

export default NavBar
