import React, { useState, useEffect } from "react"
import AchievementGrid from "../../components/achievements/AchievementGrid"
import { IAchievement } from "../../models/achievement"
import DUMMY_ACHIEVEMENTS from "../../data/achievements.json"
import { Box, Stack, Typography } from "@mui/material"
import { getAllAchievementsAsync } from "../../api/achievement"

const Achievements = () => {
  const [achievements, setAchievements] = useState([] as IAchievement[])


  useEffect(() => {
    async function getAchievements() {
      const achievementData = await getAllAchievementsAsync()
      setAchievements(achievementData)
    } 
    getAchievements()
  }, [])
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Stack spacing={4}>
        <Typography variant="h5">Achievements</Typography>
        <AchievementGrid achievements={achievements} />
      </Stack>
    </Box>
  )
}

export default Achievements
