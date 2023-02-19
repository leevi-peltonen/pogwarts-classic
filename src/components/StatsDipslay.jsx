import { usePlayer } from "../context/PlayerContext"


const StatsDisplay = () => {

  const {player} = usePlayer()


  return (
    <>
      <h3>Hello, {player.name}!</h3>
      <h3>Player level: {player.level}</h3>
      <p>Health remaining: {player.health}</p>
      <p>Strength: {player.attributes.str}</p>
      <p>Dexterity: {player.attributes.dex}</p>
      <p>Intelligence: {player.attributes.int}</p>
    </>
  )
}

export default StatsDisplay