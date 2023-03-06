import { Grid } from "@mui/material"

import React, { useState, useEffect, useContext } from "react"
import { IAchievement } from "../../models/achievement"
import { ICharacterContext, CharacterContext } from "../../context/CharacterContext"

interface IAchievementGridProps {
  achievements: IAchievement[]
}

const AchievementGrid = ({ achievements }: IAchievementGridProps) => {
  const { character, setCharacter } = useContext<ICharacterContext>(CharacterContext);
  const [unlockedAchievements, setUnlockedAchievements] = useState(character.achievements) // TODO: change initial value to empty array when db is implemented

  const showDetails = (achievement: IAchievement) => {
    console.log(achievement)
  }

  const checkIfUnlocked = (achievement: IAchievement) => {
    if (unlockedAchievements && unlockedAchievements.includes(achievement.achievementId)) {
      return true
    }
    return false
  }

  return (
    <Grid container spacing={8} gap={8}>
      {achievements.map((achievement, i) => (
        <Grid
          key={i}
          onClick={() => showDetails(achievement)}
          xs={2}
          height={100}
          sx={{
            borderRadius: "10px",
            backgroundColor: checkIfUnlocked(achievement) ? "#E2C044" : "#2E5266",
            color: "white",
            boxShadow: checkIfUnlocked(achievement) ? 8 : 0,
            opacity: checkIfUnlocked(achievement) ? 0.8 : 0.2,
          }}
        >
          <h4>{achievement.name}</h4>
        </Grid>
      ))}
    </Grid>
  )
}

export default AchievementGrid
