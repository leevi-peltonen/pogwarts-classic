import NameCreator from "../../components/character-creator/NameCreator"
import AttributeCreator from "../../components/character-creator/AttributeCreator"

import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { usePlayer } from "../../context/PlayerContext"
import StatsDisplay from "../../components/StatsDipslay"

const CharacterCreator = () => {
  const [step, setStep] = useState(1)
  const { player, setPlayer } = usePlayer()
  const navigate = useNavigate()

  const finishCreation = () => {
    navigate("/")
  }

  const confirmName = (name) => {
    setPlayer((prev) => ({
      ...prev,
      name: name,
    }))
    setStep(step + 1)
  }

  const confirmAttributes = (attributes) => {
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
      equippedWeapon: {
        name: "Basic Sword",
        description: "A classic melee weapon, used to slash and stab enemies.",
        damage: 10,
        price: 100,
        rarity: "common",
      },
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
