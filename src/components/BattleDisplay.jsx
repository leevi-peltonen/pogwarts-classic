import { Button, ButtonGroup } from "@mui/material"
import { useState } from "react"
import Fight from "./Fight"
import Enemies from "../data/enemies.json"
import { generateEnemy } from "../utils/common"
import { useEnemy } from "../context/EnemyContext"

const BattleDisplay = () => {

  
  const {enemy, setEnemy} = useEnemy()

  const handleFight = (difficulty) => {
    const _enemy = Enemies.enemies.find(enemy => enemy.level === difficulty)
    setEnemy(_enemy)
  }

  return (
    <>
      <h2>Fight enemies</h2>
      <ButtonGroup>
        {Enemies.enemies.map((enemy, i) => (
          <Button onClick={() => handleFight(enemy.level)} key={i}>
            Enemies lvl {enemy.level}
          </Button>
        ))}
      </ButtonGroup>

      {enemy && <Fight enemy={enemy} />
      }
    </>
  )
}

export default BattleDisplay
