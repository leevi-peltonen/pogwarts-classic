import React, { useContext, Dispatch, SetStateAction } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createUser, getUserByName } from '../../api/login';
//import { PlayerContext, IPlayerContext } from '../../context/PlayerContext';
import { useNavigate, NavLink } from 'react-router-dom';
import { IUserRegister } from '../../models/userRegister';
import { IPlayer } from '../../models/player';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit">
//         Pogwarts
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

interface ISignUpProps {
  player: IPlayer,
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void,
  setNewPassword: Dispatch<SetStateAction<string>>
  setNewUser: Dispatch<SetStateAction<string>>
}

export default function SignUp(props: ISignUpProps) {

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /*
    const temp = new FormData(event.currentTarget);
    let user: IUserRegister = {} as IUserRegister;
    if (temp.get('username') !== null) {
       user = {
         username: temp.get('username') as string,
         password: temp.get('password') as string,
         repeatPassword: temp.get('repeat-password') as string
       };

    }
    */

    const data = new FormData(event.currentTarget)
    const dataPairs = Array.from(data.entries())
    const user: IUserRegister = {} as IUserRegister
    for(let pair of dataPairs) {
      if(pair[0] === "username") {
        user.username = pair[1] as string
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

    // Check if username exists
    
    if(!await userExists(user)) {
      props.setNewPassword(user.password)
      props.setNewUser(user.username)
      navigate('/character-creation')
    }
  };

  const userExists = async (user: IUserRegister) => {
    const returnVal = await getUserByName(user.username)
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