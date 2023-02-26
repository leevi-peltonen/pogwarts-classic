import { useNavigate } from "react-router-dom"
import {AppBar, Toolbar, IconButton, Typography, Stack, Button, ThemeProvider, createTheme } from '@mui/material'
import Link from "@mui/material/Link";
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import React, { useContext } from "react"
import { IUser } from "../models/user";

interface INavBarProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
  handleLogout: (event: React.MouseEvent<HTMLElement>) => void
}

const NavBar = (props: INavBarProps): JSX.Element => {
  
  //const { player } = useContext(PlayerContext) as IPlayerContext;

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
              {props.user.name ?
              <>
                <Button onClick={() => navigate('/characters')} color="inherit" >Characters</Button>
                <Button onClick={() => navigate('/quests')} color="inherit">Quests</Button>
                <Button onClick={() => navigate('/contracts')} color="inherit">Contracts</Button>
                <Button onClick={() => navigate('/battle')} color="inherit">Battle</Button>
                <Button onClick={() => navigate('/player-inventory')} color="inherit">Inventory</Button>
                <Button onClick={() => navigate('/shop')} color="inherit">Shop</Button>
                <Button onClick={props.handleLogout} color="inherit">Sign out</Button>
              </> 
              : 
              <>
                <Button color="inherit" onClick={() => navigate('/signup')}>Sign up</Button>
                <Button  color="inherit" onClick={() => navigate('/login')}>Login</Button>
              </>
              }
            </Stack>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    )
}

export default NavBar
