import React from 'react'
import AttributeCreator from "../../components/character-creator/AttributeCreator"
import { useNavigate } from "react-router-dom"

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
