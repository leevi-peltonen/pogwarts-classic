import "./App.css"
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Route, Routes } from "react-router-dom"
import CharacterCreator from "./pages/character-creation/CharacterCreator"
import MainScreen from "./pages/main-screen/MainScreen"
import Inventory from "./components/inventory/Inventory"
import BattleDisplay from "./components/battle/BattleDisplay"
import NavBar from "./components/NavBar"
import Shop from "./components/shop/Shop"
import SignIn from "./pages/login/SignIn"
import SignUp from "./pages/login/SignUp"
import Quests from "./pages/Quests/Quests";
import Contracts from "./pages/Contracts/Contracts";
import { IUser } from "./models/user";
import { createUser, login } from "./api/login";
import { IUserRegister } from "./models/userRegister";
import { IUserLogin } from "./models/userLogin"
import { ICharacterContext, CharacterContext } from "./context/CharacterContext";
import { ICharacter } from "./models/character";
import CharacterSelection from "./pages/character-selection/CharacterSelection";
import SidePanel from "./components/SidePanel";
import Map from "./pages/map/Map";
import Achievements from "./pages/achievements/Achievements";
import Settings from "./pages/settings/Settings";
import Stats from "./pages/stats/Stats";
import WorldBosses from "./pages/world-bosses/WorldBosses";

export default function App() {

  const [user, setUser] = useState<IUser>({} as IUser);
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [newName, setNewName] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [token, setToken] = useState<string>('')

  const navigate = useNavigate()

  useEffect(() => {
    const loggedPlayerJSON = window.localStorage.getItem('loggedPlayer');
    if (loggedPlayerJSON) {
      const loggedPlayer = JSON.parse(loggedPlayerJSON);
      console.log("haloo",loggedPlayer)
      setUser(loggedPlayer);
    }
  }, [])

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: IUserLogin = {
      name: name,
      password: password
    };
    const returnedUser = await login(user);
    window.localStorage.setItem("loggedPlayer", JSON.stringify(returnedUser));
    setUser(returnedUser);
    navigate('/');
    setName('');
    setPassword('');
  }

  const handleLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedPlayer')
    setUser(() => ({} as IUser))
    setCharacter({} as ICharacter)
    navigate('/')
  }

  const handleRegister = async (name: string, password:string, repeatPassword: string) => {
    const userToCreate: IUserRegister = {
      name: name,
      password: password,
      repeatPassword: repeatPassword
    }

    const returnedUser = await createUser(userToCreate)
    console.log(returnedUser)
    window.localStorage.setItem('loggedPlayer', JSON.stringify(returnedUser))
    setUser(returnedUser.data);
    navigate('/')
    setNewName('')
    setNewPassword('')
  }

  return (
      <div className="App">
        <NavBar user={user} setUser={setUser} handleLogout={handleLogout} />
        <SidePanel user={user} setUser={setUser} />
        <Routes>
          {user.name ? (
            <>
                
                  <Route path="/" element={<MainScreen user={user} setUser={setUser} />}/>
                  <Route path="/Inventory" element={<Inventory user={user} setUser={setUser} />}/>
                  <Route path="/Battle"element={<BattleDisplay user={user} setUser={setUser} />} />
                  <Route path="/Shop" element={<Shop user={user} setUser={setUser} />}/>
                  <Route path="/Quests" element={<Quests />} />
                  <Route path="/Contracts" element={<Contracts />} />
                  <Route path="/characters" element={<CharacterSelection user={user} setUser={setUser} />} />
                  <Route path="/character-creation" element={<CharacterCreator user={user}  setUser={setUser} />}/>
                  <Route path="/Map" element={<Map />}/>
                  <Route path="/Achievements" element={<Achievements />} />
                  <Route path="/Settings" element={<Settings />} />
                  <Route path="/Stats" element={<Stats />} />
                  <Route path="/worldbosses" element={<WorldBosses />} />
            </>
          )
          :
          (
          <>
            <Route path="/" element={<MainScreen user={user} setUser={setUser} />}/>
            <Route path="/login" element={
              <SignIn
                user={user}
                setUser={setUser}
                handleLogin={handleLogin}
                name={name}
                setName={setName}
                password={password}
                setPassword={setPassword}
                
              />
            }
            />
            <Route path="/signup" element={<SignUp handleRegister={handleRegister} setNewName={setNewName} setNewPassword={setNewPassword} user={user} setUser={setUser}/>}/>
            <Route path="/character-creation" element={<CharacterCreator user={user}  setUser={setUser} />}/>
          </>
          )}
        </Routes>
      </div>
  )
}
