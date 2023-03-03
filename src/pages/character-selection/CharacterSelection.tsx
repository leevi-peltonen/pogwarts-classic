import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { IUser } from "../../models/user"
import { CharacterContext, ICharacterContext } from "../../context/CharacterContext"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material'
import { ICharacter } from "../../models/character";
import './CharacterSelection.css'

interface ICharacterSelectionProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
}

const CharacterSelection = (props: ICharacterSelectionProps) => {
  const [characters, setCharacters] = useState(props.user.characters)
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);
  const navigate = useNavigate()
  const handleCharacterSwitch = (char: ICharacter) => {
    setCharacter(char)
  }

  return (
    <>
      <TableContainer sx={{ maxWidth: 800, margin: "0 auto" }} component={Paper}>
        <Table sx={{ margin: "0 auto" }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Strength</TableCell>
              <TableCell>Dexterity</TableCell>
              <TableCell>Intelligence</TableCell>
              <TableCell>Switch To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {characters.map((char,i) => {
              return (
                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 }  }} selected={char.name===character.name}  >
                  <TableCell>{char.name}</TableCell>
                  <TableCell>{char.level}</TableCell>
                  <TableCell>{char.strength}</TableCell>
                  <TableCell>{char.dexterity}</TableCell>
                  <TableCell>{char.intelligence}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleCharacterSwitch(char)}>Switch</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => navigate('/character-creation')} >Create New</Button>
    </>
  )
}

export default CharacterSelection