import { Button, Typography, Box } from "@mui/material"
import React, { useState } from "react"
import { IEnemy } from "../models/enemy"
import { IPlayer } from "../models/player";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Fight from "./Fight";

interface IBattleDisplayProps {
  player: IPlayer,
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void,
}

const BattleDisplay = (props: IBattleDisplayProps) => {

  const [enemy, setEnemy] = useState<IEnemy | null>()

  const TABLE_HEADERS = ["Name", "Level", "Health", "Attack", "Defense", "Fight"]

  const ENEMIES_PLACEHOLDER = [
    {
      "name": "Goblin",
      "level": 1,
      "health": 20,
      "attack": 10,
      "defense": 5,
      "isAlive": true
    },
    {
      "name": "Skeleton",
      "level": 2,
      "health": 25,
      "attack": 15,
      "defense": 8,
      "isAlive": true
    },
    {
      "name": "Giant Rat",
      "level": 3,
      "health": 30,
      "attack": 18,
      "defense": 10,
      "isAlive": true
    },
    {
      "name": "Zombie",
      "level": 4,
      "health": 35,
      "attack": 20,
      "defense": 12,
      "isAlive": true
    }
  ]

  return (
    <>
      <TableContainer sx={{ maxWidth: 800, margin: "0 auto" }} component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {TABLE_HEADERS.map((header, i) => {
                return (
                  <TableCell key={i}>{header}</TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
              {ENEMIES_PLACEHOLDER.map((enemy, i) => {
                return (
                  <TableRow 
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{enemy.name}</TableCell>
                    <TableCell align="right">{enemy.level}</TableCell>
                    <TableCell align="right">{enemy.health}</TableCell>
                    <TableCell align="right">{enemy.attack}</TableCell>
                    <TableCell align="right">{enemy.defense}</TableCell>
                    <TableCell align="right">
                      <EnemyDialog enemy={enemy} player={props.player} setPlayer={props.setPlayer} />
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
})

interface IEnemyDialogProps {
  enemy: IEnemy;
  player: IPlayer;
  setPlayer: (cb: (player: IPlayer) => IPlayer) => void;
}

function EnemyDialog(props: IEnemyDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Fight
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props.enemy.name}, Level {props.enemy.level}
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Exit
            </Button>
          </Toolbar>
        </AppBar>
        {/*
        <List>
          <ListItem>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Default notification ringtone"
              secondary="Tethys"
            />
          </ListItem>
        </List>
      */}
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center">
          <Fight enemy={props.enemy} player={props.player} setPlayer={props.setPlayer} />
      </Box>
      </Dialog>
    </div>
  );
}

export default BattleDisplay