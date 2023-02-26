import React, { useState, useEffect, useContext } from "react"
import AttributeCreator from "../../components/character-creator/AttributeCreator"
import { useNavigate } from "react-router-dom"
import WeaponSelection from "../../components/character-creator/WeaponSelection"
import { IUser } from "../../models/user"
import { IWeapon } from "../../models/weapon"
import { Button, Stack, TextField, Typography } from "@mui/material/"
import { red } from "@mui/material/colors"
import { IAttributes } from "../../models/attributes"
import { createUser } from "../../api/login"
import { CharacterContext, ICharacterContext } from '../../context/CharacterContext'
import { createCharacter } from "../../api/character"
import { ICharacter } from "../../models/character"


interface ICharacterCreatorProps {
  user: IUser,
  setUser: (cb: (user: IUser) => IUser) => void,
}

const CharacterCreator = (props: ICharacterCreatorProps) => {
  const navigate = useNavigate()

  // Context
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);

  // States
  const [pointsRemaining, setPointsRemaining] = useState<Number>(10)
  const [characterName, setCharacterName] = useState('')
  const [attributes, setAttributes] = useState<IAttributes>({
    str: 1,
    dex: 1,
    int: 1,
  })
  const [chosenWeapon, setChosenWeapon] = useState<IWeapon>({} as IWeapon)

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

  const handleCharacterCreation = async () => {
    //TODO: - CreateNewCharacter to DB with attributes and chosen weapon
    const temp: ICharacter = await createCharacter({
      name: characterName,
      strength: attributes.str,
      dexterity: attributes.dex,
      intelligence: attributes.int,
      userName: props.user.name
    })
    setCharacter(temp)
    props.setUser(prev => ({...prev, characters: [...prev.characters, temp]}))
    navigate('/characters')
  }

  return (
    <>
      <h2>Character Creation</h2>
      <Stack
        spacing={4}
        direction="row"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <TextField variant="outlined" value={characterName} onChange={(event) =>{setCharacterName(event.target.value)}} />
        <WeaponSelection handleChosenWeapon={handleChosenWeaponSelection} />
        <AttributeCreator
          handleAttributes={handleAttributes}
          handleSetPointsRemaining={handleSetPointsRemaining}
        />
      </Stack>
      <Button
        sx={{ width: "200px", marginTop: "50px", marginBottom: "50px" }}
        onClick={handleCharacterCreation}
        disabled={pointsRemaining > 0}
        variant="contained"
      >
        Create Character
      </Button>
      {pointsRemaining > 0 && (
        <Typography color={red[800]}>
          Please assign all points before continuing
        </Typography>
      )}
    </>
  )
}

export default CharacterCreator
