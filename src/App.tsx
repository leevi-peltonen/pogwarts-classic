import "./App.css"
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import CharacterCreator from "./pages/character-creation/CharacterCreator"
import MainScreen from "./pages/main-screen/MainScreen"
import Inventory from "./components/Inventory"
import BattleDisplay from "./components/BattleDisplay"
import NavBar from "./components/NavBar"

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
      <Routes>
        <Route path="/" element={<MainScreen></MainScreen>}/>
        <Route path="/character-creation" element={<CharacterCreator />}/>
        <Route path="/player-inventory" element={<Inventory />}/>
        <Route path="/battle"element={<BattleDisplay />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}
