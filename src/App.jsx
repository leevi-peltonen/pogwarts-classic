import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CharacterCreator from "./pages/character-creation/CharacterCreator"
import MainScreen from "./pages/main-screen/MainScreen"
import Inventory from "./components/Inventory"
import BattleDisplay from "./components/BattleDisplay"
import NavBar from "./components/NavBar"
import Shop from "./components/Shop"
import SignIn from "./pages/login/SignIn"
import SignUp from "./pages/login/SignUp"

function App() {



  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path="/" element={<MainScreen></MainScreen>}/>
          <Route path="/login" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/character-creation" element={<CharacterCreator />}/>
          <Route path="/player-inventory" element={<Inventory />}/>
          <Route path="/battle"element={<BattleDisplay />} />
          <Route path="shop" element={<Shop />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
