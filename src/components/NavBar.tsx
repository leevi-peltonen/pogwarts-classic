import { NavLink } from "react-router-dom"
import React, { useContext } from "react"
import { PlayerContext, IPlayerContext } from "../context/PlayerContext"

const NavBar = (): JSX.Element => {
  
  const { player } = useContext(PlayerContext) as IPlayerContext;

  if (player) {
    return (
      <nav>
        <ul>
          <li>
            <NavLink to="battle">Battle</NavLink>
          </li>
          <li>
            <NavLink to="player-inventory">Inventory</NavLink>
          </li>
        </ul>
      </nav>
    )
  } else {
    return <></>
  }
}

export default NavBar
