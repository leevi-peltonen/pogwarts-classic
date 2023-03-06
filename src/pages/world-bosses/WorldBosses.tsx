import React, { useState, useContext, useEffect } from "react"
import BossLobby from "../../components/world-bosses/BossLobby"
import { IBoss } from "../../models/enemy"
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr"
import Chat from "../../components/world-bosses/Chat"
import { Box, Stack, Button } from "@mui/material"
import BossFight from "../../components/world-bosses/BossFight"
import {
  ICharacterContext,
  CharacterContext,
} from "../../context/CharacterContext"
import { calculateDamageToEnemy } from "../../utils/common"

export interface IMessage {
  character: string
  message: string
}


const WorldBosses = () => {
  const { character, setCharacter } =
    useContext<ICharacterContext>(CharacterContext)
  const [connection, setConnection] = useState<HubConnection>()
  const [allReady, setAllReady] = useState(false)
  const [messages, setMessages] = useState([] as IMessage[])
  const [numOfPlayers, setNumOfPlayers] = useState(0)
  const [numOfPlayersReady, setNumOfPlayersReady] = useState(0)
  const [boss, setBoss] = useState<IBoss | undefined>(undefined)
  const [turnNumber, setTurnNumber] = useState(0)
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [isCharacterAlive, setIsCharacterAlive] = useState(true)




  const handleJoinRoom = async (characterName: string, lobbyName: string) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7201/bossHub")
        .configureLogging(LogLevel.Information)
        .build()

      connection.on("ReceiveMessage", (character: string, message: string) => {
        setMessages((messages) => [...messages, { character, message }])
      })

      connection.onclose((e) => {
        setConnection(undefined)
        setMessages([])
      })

      connection.on("PlayersInLobby", (numPlayers: number) => {
        setNumOfPlayers(numPlayers)
      })

      connection.on("PlayersReady", (numPlayersReady: number) => {
        setNumOfPlayersReady(numPlayersReady)
      })

      connection.on("BossFightStarted", (numReadyPlayers: number) => {
        setMessages((messages) => [
          ...messages,
          {
            character: "Botwarts",
            message: `Boss fight has started with ${numReadyPlayers} players`,
          },
        ])
        setNumOfPlayers(numReadyPlayers)
        setAllReady(true)
      })

      connection.on("PlayerAttacked", (playerName: string, damage: number) => {
        setMessages((messages) => [
          ...messages,
          { character: playerName, message: `Attacked for ${damage}` },
        ])
      })

      connection.on("PlayerActionCompleted", (playerName: string) => {

      })

      connection.on("NotYourTurn", (message: string) => {
        setMessages((messages) => [
          ...messages,
          { character: "Botwarts", message: message },
        ])
      })

      connection.on("BossStatus", (boss: IBoss) => {
        setBoss(boss)
      })

      connection.on("BossFightEnded", () => {
        setMessages((messages) => [
          ...messages,
          { character: "Botwarts", message: "Boss fight has ended" },
        ])
        setAllReady(false)
        setBoss(undefined)
      })

      connection.on("BossAttacked", (damage: number, characterName: string) => {
        setMessages((messages) => [
          ...messages,
          { character: "Boss", message: `Attacked ${characterName} for ${damage}` },
        ])
        if(characterName === character.name) {
          setCharacter((prev) => {
            return {
              ...prev,
              health: prev.health - damage,
            }
          })
          if(character.health <= 0  ) {
            connection.invoke("LeaveLobby", character.name)
          }
        }
        setTurnNumber((prev) => prev + 1)
      })

      connection.on("CharacterDied", (characterName: string) => {
        setMessages((messages) => [
          ...messages,
          { character: characterName, message: `has died` },
        ])
        setIsCharacterAlive(false)
      })

      
    connection.on("StartNextTurn", () => {
      if(isCharacterAlive) {
        setIsPlayerTurn(true);

      }
      
    });

      connection.on("BossKilled", (boss: IBoss) => {
        setMessages((messages) => [
          ...messages,
          { character: "Botwarts", message: "Boss has been killed" },
        ])
        setBoss(boss)
        setAllReady(false)
      })

      connection.on("PlayerReady", (playerName: string) => {
        setMessages((messages) => [
          ...messages,
          { character: playerName, message: `is ready` },
        ])
      })

      connection.on("AllPlayersReady", () => {
        setMessages((messages) => [
          ...messages,
          { character: "Botwarts", message: "All players are ready" },
        ])
        handleStartBossFight()
      })

      await connection.start()
      const tempboss: IBoss = await connection.invoke("JoinRoom", {
        Character: characterName,
        Room: lobbyName,
      })
      setConnection(connection)
      setBoss(tempboss)
    } catch (err: any) {
      console.log(err)
      if (err.message === "Boss fight has already started. Cannot join now.") {
        alert("Fight has already started")
      }
    }
  }

  const closeConnection = async () => {
    try {
      await connection?.stop()
    } catch (e) {
      console.log(e)
    }
  }

  const sendMessage = async (message: string) => {
    try {
      await connection?.invoke("SendMessage", message)
    } catch (e) {
      console.log(e)
    }
  }

  const handleStartBossFight = () => {
    setAllReady(true)
    if (boss) connection?.invoke("StartBossFight", boss.name)
  }

  const handleReady = () => {
    if (boss) connection?.invoke("PlayerReady", character.name, boss.name)
  }

  const handleAttackBoss = () => {
    if(boss) connection?.invoke("AttackBoss", character.name, boss.name, calculateDamageToEnemy(character.equippedWeapon), boss)
    if(boss) connection?.invoke("PlayerActionCompleted", boss.name)
    setIsPlayerTurn(false)
  }


  useEffect(() => {
    return () => {
      closeConnection()
    }
  }, [])


  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {!connection && isCharacterAlive ? (
        <>
          <BossLobby
            boss={"Malakar the Dark Lord"}
            handleJoinRoom={handleJoinRoom}
          />
        </>
      ) : allReady ? (
        <Stack spacing={4}>
          <p>
            Players: <b>{numOfPlayers}</b>
          </p>
          <p>Turn: {turnNumber}</p>
          <p>Boss Health: {boss?.health}</p>
          <p>
            {character.name} health: {character.health}
          </p>
          <Button disabled={!isPlayerTurn} onClick={handleAttackBoss}>Attack</Button>
          <Chat messages={messages} sendMessage={sendMessage} />
        </Stack>
      ) : (
        <Stack direction="row" spacing={4}>
          <p>
            Players ready:{" "}
            {numOfPlayers > 0 && (
              <b>
                {numOfPlayersReady} / {numOfPlayers}
              </b>
            )}
          </p>
          <Chat messages={messages} sendMessage={sendMessage} />
          <Button onClick={handleReady}>Ready</Button>
          <Button onClick={closeConnection}>Leave</Button>
        </Stack>
      )}
    </Box>
  )
}

export default WorldBosses
