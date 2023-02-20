import React, {useState, useContext} from 'react'
import { NameCreator } from "../../components/character-creator/NameCreator"
import AttributeCreator from "../../components/character-creator/AttributeCreator"
import { useNavigate } from "react-router-dom"
import { PlayerContext, IPlayerContext } from "../../context/PlayerContext";
import { IPlayer } from '../../models/player';
import { IAttributes } from '../../models/attributes';
import { starterWeapon } from '../../models/weapon';

const CharacterCreator = () => {

  const [step, setStep] = useState(1)
  const { setPlayer } = useContext(PlayerContext) as IPlayerContext;
  const navigate = useNavigate()

  const finishCreation = () => {
    navigate("/")
  }

  const confirmName = (name: string) => {
    setPlayer((prev: IPlayer) => ({
      ...prev,
      name: name,
    }))
    setStep(step + 1)
  }

  const confirmAttributes = (attributes: IAttributes) => {
    setPlayer((prev) => ({
      ...prev,
      attributes: attributes,
      health: 100,
      availableAttributePoints: 0,
      experiencePoints: 0,
      damage: 5,
      inventory: {
        weapons: [],
        armor: [],
        potions: [],
        scrolls: [],
        coins: 0,
      },
      equippedWeapon: starterWeapon,
      equippedArmor: {},
    }))
    if (window.confirm("Are you sure these are the stats you want?")) {
      finishCreation()
    }
  }

  return (
    <>
      <h2>Character Creation</h2>
      {step === 1 && <NameCreator confirmName={confirmName} />}
      {step === 2 && <AttributeCreator confirmAttributes={confirmAttributes} />}
    </>
  )
}

export default CharacterCreator
