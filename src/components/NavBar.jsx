import { NavLink } from "react-router-dom"
import { usePlayer } from "../context/PlayerContext"

const NavBar = () => {
  const { player } = usePlayer()

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
  }
}

export default NavBar
