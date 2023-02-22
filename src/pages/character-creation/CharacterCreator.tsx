import React, { useState, useEffect } from 'react'
import AttributeCreator from "../../components/character-creator/AttributeCreator"
import { useNavigate } from "react-router-dom"
import WeaponSelection from '../../components/character-creator/WeaponSelection'
import { IPlayer } from '../../models/player'
import { IWeapon } from '../../models/weapon'
import { Button, Stack, Typography } from '@mui/material/'
import { red } from '@mui/material/colors'
import { IAttributes } from '../../models/attributes'

const CharacterCreator = () => {

  const navigate = useNavigate()

  // States
  const [player, setPlayer] = useState<IPlayer>()

  const [pointsRemaining, setPointsRemaining] = useState<Number>(10)
  const [attributes, setAttributes] = useState<IAttributes>({
    strength: 1,
    intelligence: 1,
    dexterity: 1
  })
  const [chosenWeapon, setChosenWeapon] = useState<IWeapon>({
    id: "63f4c6726b4f216722ac6ce8",
    name: "Basic Sword ",
    description: "A classic melee weapon, used to slash and stab enemies.",
    damage: 10,
    price: 100,
    rarity: "common"
  })

  // Handlers
  const handleChosenWeaponSelection = (weapon: IWeapon) => {
    setChosenWeapon(weapon)
  }

  const handleSetPointsRemaining = (points: Number) => {
    setPointsRemaining(points)
  }

  const handleAttributes = (attributes: IAttributes) => {
    setAttributes(attributes)
  }

  const handleCharacterCreation = () => {
    //TODO: - Create Player character state with 'chosenWeapon' and 'attributes' states
    //      - then: navigate to mainpage

    console.log(chosenWeapon)
    console.log(attributes)
  }


  return (
    <>
      <h2>Character Creation</h2>
      <Stack 
      spacing={4} 
      direction="row"
      display="flex"
      justifyContent="center"
      alignItems="center">
        <WeaponSelection handleChosenWeapon={handleChosenWeaponSelection} />
        <AttributeCreator handleAttributes={handleAttributes} handleSetPointsRemaining={handleSetPointsRemaining} />

      </Stack>
      <Button sx={{ width:"200px", marginTop:"50px", marginBottom:"50px" }} onClick={handleCharacterCreation} disabled={pointsRemaining > 0} variant="contained">Create Character</Button>
        {pointsRemaining > 0 && <Typography color={ red[800] }>Please assign all points before continuing</Typography>}
    </>
  )
}

export default CharacterCreator
