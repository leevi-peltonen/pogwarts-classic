import React, { Dispatch, SetStateAction } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getUserByName } from '../../api/login';
//import { PlayerContext, IPlayerContext } from '../../context/PlayerContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { IUserRegister } from '../../models/userRegister';
import { IUser } from '../../models/user';

const theme = createTheme();

interface ISignUpProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
  setNewPassword: Dispatch<SetStateAction<string>>
  setNewName: Dispatch<SetStateAction<string>>
  handleRegister: Function
}

export default function SignUp(props: ISignUpProps) {

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const dataPairs = Array.from(data.entries())
    const user: IUserRegister = {} as IUserRegister
    for(let pair of dataPairs) {
      if(pair[0] === "username") {
        user.name = pair[1] as string
      }
      if(pair[0] === "password") {
        user.password = pair[1] as string
      }
      if(pair[0] === "repeat-password") {
        user.repeatPassword = pair[1] as string
      }
    }

    // Check for matching passwords
    if(user.password !== user.repeatPassword) {
      window.alert('Passwords do not match!')
      return
    }

    //TODO Check if username exists. Func exists already
    
      props.setNewPassword(user.password)
      props.setNewName(user.name)
      props.handleRegister(user.name, user.password, user.repeatPassword)
      navigate('/characters')
    
  };

  const userExists = async (user: IUserRegister) => {
    const returnVal = await getUserByName(user.name)
    if (returnVal.data.length > 0) {
      window.alert('Account already exists!');
      return true;
    } else {
      return false;
    }
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repeat-password"
                  label="Repeat Password"
                  type="password"
                  id="repeat-password"
                  autoComplete="new-password"
                />
              </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login">
                  Already have an account? Sign in
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </ThemeProvider>
  );
}