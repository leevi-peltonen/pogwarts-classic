import Enemies from "../data/enemies.json"
import Weapons from "../data/weapons.json"
import { IPlayer } from "../models/player"
import { IEnemy } from "../models/enemy"
import { IWeapon } from "../models/weapon"

export const performSkillCheck = (
  attributeLevel: number,
  difficultyNumber: number,
  diceSize: number
) => {
  let successes = 0
  for (let i = 0; i < attributeLevel; i++) {
    let result = Math.floor(Math.random() * diceSize) + 1
    if (result >= difficultyNumber) {
      successes++
    }
  }
  return successes
}

// calculateDamage
export const calculateDamage = (damageAmount: number, target: IEnemy) => {
  target.health -= damageAmount
  if (target.health <= 0) {
    return { ...target, isAlive: false }
  }
  return target
}
const getRarity = (difficultyFactor: number) => {
  const rarityRoll = Math.random()

  if (rarityRoll < 0.5 / difficultyFactor) {
    return "common"
  } else if (rarityRoll < 1 / difficultyFactor) {
    return "uncommon"
  } else if (rarityRoll < 2 / difficultyFactor) {
    return "rare"
  } else if (rarityRoll < 4 / difficultyFactor) {
    return "epic"
  } else {
    return "legendary"
  }
}

// generateLoot
export const generateLoot = (difficulty: number) => {
  console.log("You killed a level " + difficulty + " enemy!")
  const rarity = getRarity(difficulty)
  const weaponList = rarity + "_weapons";
  const index = Math.floor(Math.random() * Weapons[weaponList as keyof typeof Weapons].length);
  const loot = Weapons[weaponList as keyof typeof Weapons][index];
  return loot;
}

export const generateCoins = (difficulty: number) => {
  return Math.floor(Math.random() * 10) * difficulty
}

// levelUp
export const levelUp = (character: IPlayer) => {
  character.level += 1
  character.health += 10
  character.availableAttributePoints += 1
}

// generateEnemy
// when more enemies are generated to data/enemies.json -> return enemies randomly from specific difficulty tier
export const generateEnemy = (difficulty: number) => {
  const enemies = Enemies.enemies.filter((enemy) => enemy.level === difficulty)
  return enemies
}

// determineAmountOfEnemies
export const determineAmountOfEnemies = () => {
  const randomNumber = Math.random()

  if (randomNumber < 0.6) {
    return 1
  } else if (randomNumber < 0.8) {
    return 2
  } else if (randomNumber < 0.95) {
    return 3
  } else if (randomNumber < 0.99) {
    return 4
  } else {
    return 5
  }
}

// performAttack
export const performAttack = (attacker: IPlayer, target: IEnemy, attackItem: IWeapon): IEnemy => {
  const damageAmount =
    attacker.attributes.strength +
    attacker.damage +
    attackItem.damage -
    target.defense
  if (damageAmount <= 0) {
    console.log(`${target.name} took no damage! It has too much defense!`)
    return target
  } else {
    console.log(`${target.name} took ${damageAmount} damage!`)
    return calculateDamage(damageAmount, target)
  }
}

// Level Curve
// Find required XP for X level
const getLevelExperience = (level: number) => {
  return Math.floor(100 * Math.pow(1.1, level))
}

// checkForLevelUp
// Required after each action that gives XP
export const checkForLevelUp = (player: IPlayer, earnedXP: number) => {
  if (player.experience + earnedXP >= getLevelExperience(player.level + 1)) {
    levelUp(player)
  }
}
