import NameCreator from "../../components/character-creator/NameCreator"
import AttributeCreator from "../../components/character-creator/AttributeCreator"

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { usePlayer } from "../../context/PlayerContext"
import StatsDisplay from "../../components/StatsDipslay"
import { getWeaponByID } from "../../api/items"

const CharacterCreator = () => {

  const navigate = useNavigate()


  const confirmAttributes = () => {
   
    if (window.confirm("Are you sure these are the stats you want?")) {
      navigate("/")
    }
  }

  return (
    <>
      <h2>Character Creation</h2>
      <AttributeCreator confirmAttributes={confirmAttributes} />
    </>
  )
}

export default CharacterCreator
