import { Button, ButtonGroup } from "@mui/material"
import React, { useContext } from "react"
import Fight from "./Fight"
import Enemies from "../data/enemies.json"
import { EnemyContext, IEnemyContext } from "../context/EnemyContext"

const BattleDisplay = () => {

  const {enemy, setEnemy} = useContext(EnemyContext) as IEnemyContext;

  const handleFight = (difficulty: number) => {
    const _enemy = Enemies.enemies.find(enemy => enemy.level === difficulty);
    if (_enemy) {
      setEnemy(() => _enemy);
    }
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

      {enemy && <Fight />
      }
    </>
  )
}

export default BattleDisplay
