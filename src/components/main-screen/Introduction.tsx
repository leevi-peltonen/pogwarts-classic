import React from 'react';
import { Box, Typography, ThemeProvider } from '@mui/material'
import { makeStyles, Theme, createTheme } from '@mui/material/styles'
import { NavLink } from 'react-router-dom';

const theme = createTheme({
  palette: {

    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 18,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
});


const styles ={
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(5),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    width: "50%",
    marginTop: theme.spacing(5)
  },
  title: {
    marginBottom: theme.spacing(5),
  },
};

type IntroductionProps = {
  gameName: string;
  gameWorldName: string;
};

const Introduction: React.FC<IntroductionProps> = ({ gameName, gameWorldName }) => {


  return (
    <ThemeProvider theme={theme}>
      <Box sx={styles.root}>
        <Typography variant="h4" component="h1" sx={styles.title}>
          Welcome to the world of {gameName}, a vast and mysterious realm filled with danger and adventure.
        </Typography>
        <Typography variant="body1" gutterBottom>
          As a brave adventurer, you will embark on a journey of discovery, battling fierce monsters, solving puzzles, and uncovering secrets hidden deep within the land.
          But beware, for every step you take could lead to peril, and every choice you make could alter the course of your destiny.
          Will you rise to become a legendary hero, or will you fall to the forces of darkness that threaten to consume the land?
          The fate of {gameWorldName} rests in your hands. Are you ready to <NavLink to="/signup">begin your quest?</NavLink>
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Introduction;
