
import { updateHealth, updateMaxHealth, updateLevel, updateXP } from "../api/user";
import Weapons from "../data/weapons.json"
import { IEnemy } from "../models/enemy";
import { ICharacter } from "../models/character";
import { IWeapon } from "../models/weapon";

///////////////////////COMBAT//////////////////////////

const PERCENTAGE_RANGE = 0.2
// calculateDamage to enemy
export const calculateDamageToEnemy = (weapon: IWeapon | undefined) => {

  if(!weapon) return 0
  const minDamage = Math.floor(weapon.damage * (1 - PERCENTAGE_RANGE))
  const maxDamage = Math.floor(weapon.damage * (1 + PERCENTAGE_RANGE))
  const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage
  return damage
}

// calculateDamage to player
export const calculateDamageToPlayer = (enemy: IEnemy) => {
  const minDamage = Math.floor(enemy.attack * (1 - PERCENTAGE_RANGE))
  const maxDamage = Math.floor(enemy.attack * (1 + PERCENTAGE_RANGE))
  const damage = Math.floor(Math.random() * (maxDamage - minDamage + 1)) + minDamage
  return damage
}

export const chanceToHitTarget = (chancePercentage: number): boolean => {
  const roll = Math.random()
  return roll < chancePercentage
  
}

//////////////////////LOOT////////////////////////////

// get random rarity affected by difficulty
const getRarity = (difficultyFactor: number) => {
  const rarityRoll = Math.random()

  if (rarityRoll < 0.5 / difficultyFactor) {
    return "common";
  } else if (rarityRoll < 1 / difficultyFactor) {
    return "uncommon";
  } else if (rarityRoll < 2 / difficultyFactor) {
    return "rare";
  } else if (rarityRoll < 4 / difficultyFactor) {
    return "epic";
  } else {
    return "legendary";
  }
}

//  loot generation 
/*
export const generateLoot = (enemy: IEnemy): IWeapon => {

  

}
*/

// generate random amount of coins based on difficulty
export const generateCoins = (difficulty: number) => {
  const amount = 1 + Math.floor(Math.random()*10)*(difficulty*2)
  return amount
}

//////////////////////CHARACTER/////////////////////////////


// calculate results of a skill check
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

// increase player level by one
export const levelUp = (character: ICharacter) => {
  character.level += 1
  character.maxHealth += 10
  character.availableAttributePoints += 1
  character.experience = 0
  character.health = character.maxHealth
}


// Level Curve
export const getLevelExperience = (level: number) => {
  return Math.floor(100 * Math.pow(1.2, level))
}


// give player XP and check for level up
export const earnXPandCheckForLevelUp = (character: ICharacter, enemyLevel: number): ICharacter => {
  const earnedXP = enemyLevel*5;
  character.experience += earnedXP
  updateXP(character)
  const nextLevelXP = getLevelExperience(character.level + 1)
  if(character.experience >= nextLevelXP) {
    levelUp(character)
    updateMaxHealth(character)
    updateHealth(character.name, character.health)
    updateXP(character)
    updateLevel(character)
  }
  return character

}

