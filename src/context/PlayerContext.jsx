import { createContext, useContext, useState } from "react";

let DEFAULT_PLAYER = {
  name: "I have no name!",
  level: 1,
  attributes: {
    strength: 1,
    dexterity: 1,
    intelligence: 1,
  },
  health: 100,
}

const PlayerContext = createContext()

export const usePlayer = () => {
    return useContext(PlayerContext)
}

const PlayerProvider = (props) => {

    const [ player, setPlayer ] = useState(null)
    const state = {
        player,
        setPlayer
    }

    return (
        <PlayerContext.Provider value= { state }>
            {props.children}
        </PlayerContext.Provider>
    )
}
export default PlayerProvider
