import "./App.css"
import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CharacterCreator from "./pages/character-creation/CharacterCreator"
import MainScreen from "./pages/main-screen/MainScreen"
import Inventory from "./components/Inventory"
import BattleDisplay from "./components/BattleDisplay"
import NavBar from "./components/NavBar"
import Shop from "./components/Shop"
import SignIn from "./pages/login/SignIn"
import SignUp from "./pages/login/SignUp"
import Quests from "./pages/Quests/Quests";
import Contracts from "./pages/Contracts/Contracts";
import { IPlayer } from "./models/player";
import { login } from "./api/login";
import { IUserRegister } from "./models/userRegister";
import { IUserLogin } from "./models/userLogin"

export default function App() {

  const [player, setPlayer] = useState<IPlayer>({} as IPlayer);
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [newUser, setNewUser] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')

  useEffect(() => {
    const loggedPlayerJSON = window.localStorage.getItem('loggedPlayer');
    if (loggedPlayerJSON) {
      const loggedPlayer = JSON.parse(loggedPlayerJSON);
      setPlayer(loggedPlayer);
    }
  }, [])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: IUserLogin = {
      username: username,
      password: password
    };
    const returnedUser = await login(user);
    window.localStorage.setItem("loggedPlayer", JSON.stringify(returnedUser));
  }

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedPlayer')
    setPlayer(() => ({} as IPlayer))
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar player={player} setPlayer={setPlayer} handleLogout={handleLogout} />
        <Routes>
          {player ? (
            <>
            <Route path="/" element={<MainScreen player={player} setPlayer={setPlayer} />}/>
            <Route path="/player-inventory" element={<Inventory player={player} setPlayer={setPlayer} />}/>
            <Route path="/battle"element={<BattleDisplay player={player} setPlayer={setPlayer} />} />
            <Route path="shop" element={<Shop player={player} setPlayer={setPlayer} />}/>
            </>
          )
          :
          (
          <>
            <Route path="/" element={
              <SignIn
                player={player}
                setPlayer={setPlayer}
                handleLogin={handleLogin}
                
              />
            }
            />
            <Route path="/signup" element={<SignUp player={player} setPlayer={setPlayer}/>}/>
            <Route path="/character-creation" element={<CharacterCreator />}/>
          </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  )
}
