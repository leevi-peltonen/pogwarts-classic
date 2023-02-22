import { useNavigate } from "react-router-dom"
import {AppBar, Toolbar, IconButton, Typography, Stack, Button, ThemeProvider, createTheme } from '@mui/material'

import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import React, { useContext } from "react"
import { PlayerContext, IPlayerContext } from "../context/PlayerContext"
import Link from "@mui/material/Link";


const NavBar = (): JSX.Element => {
  
  const { player } = useContext(PlayerContext) as IPlayerContext;

  const navigate = useNavigate()

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  


    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar position="static" >
          <Toolbar>
            <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
              <AutoFixHighIcon/>
            </IconButton>
            
              <Typography variant='h4' component='div' sx={{flexGrow: 1}}>
                <Link underline="none" color="inherit" href="/">Pogwarts Classic</Link>
              </Typography>
            
            <Stack direction="row" spacing={2}>
              {player && player.id === 'asd' ?          
              <>
                <Button color="inherit" onClick={() => navigate('/signup')}>Sign up</Button>
                <Button  color="inherit" onClick={() => navigate('/login')}>Login</Button>
              </> 
              : 
              <>
                <Button onClick={() => navigate('/quests')} color="inherit">Quests</Button>
                <Button onClick={() => navigate('/contracts')} color="inherit">Contracts</Button>
                <Button onClick={() => navigate('/battle')} color="inherit">Battle</Button>
                <Button onClick={() => navigate('/player-inventory')} color="inherit">Inventory</Button>
                <Button onClick={() => navigate('/shop')} color="inherit">Shop</Button>
              </>
              }
            </Stack>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    )
}

export default NavBar
