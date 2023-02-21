import React, { useContext } from "react";
import { PlayerContext, IPlayerContext } from "../context/PlayerContext";


const StatsDisplay = () => {

  const { player } = useContext(PlayerContext) as IPlayerContext;


  return (
    <>
      <h3>Hello, {player.name}!</h3>
      <h3>Player level: {player.level}</h3>
      <p>Health remaining: {player.health}</p>
      <p>Strength: {player.attributes.strength}</p>
      <p>Dexterity: {player.attributes.dexterity}</p>
      <p>Intelligence: {player.attributes.intelligence}</p>
    </>
  )
}

export default StatsDisplay