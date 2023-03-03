import { Button, FormControl, Typography } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { ICharacterContext, CharacterContext } from "../../context/CharacterContext";
import { IBoss } from "../../models/enemy";





interface IBossLobbyProps {
  boss: string
  handleJoinRoom: (characterName: string, lobbyName: string, boss: string) => void;
}

const BossLobby = (props: IBossLobbyProps) => {
  const [room, setRoom] = useState(props.boss);
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);

  return (
    <>
      <Typography variant="body1">{props.boss}</Typography>
      <Button variant="contained" onClick={() => props.handleJoinRoom(character.name, room, props.boss)}>Join</Button>
    </>
  )
}

export default BossLobby;