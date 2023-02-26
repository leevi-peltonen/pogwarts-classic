
import { updateLevel, updateXP } from "../api/user";
import Weapons from "../data/weapons.json"
import { IEnemy } from "../models/enemy";
import { ICharacter } from "../models/character";
import { IWeapon } from "../models/weapon";

///////////////////////COMBAT//////////////////////////
// calculateDamage
export const calculateDamage = (attackRating: number, targetDefenseRating: number): number => {
  const hitChance = 1 - targetDefenseRating / 200;
  const damage = attackRating * hitChance * (0.5 + Math.random());
  return Math.floor(damage);
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
  character.health += 10
  character.availableAttributePoints += 1
  character.experience = 0
}


// Level Curve
const getLevelExperience = (level: number) => {
  return Math.floor(100 * Math.pow(1.1, level))
}


// give player XP and check for level up
export const earnXPandCheckForLevelUp = (character: ICharacter, earnedXP: number) => {
  //DEBUG:
  //player.experience += 1000
  //NO-DEBUG:
  character.experience += earnedXP
  console.log('current XP: ',character.experience)
  updateXP(character)
  const nextLevelXP = getLevelExperience(character.level + 1)
  console.log(`Next level at ${nextLevelXP} XP`)
  if(character.experience >= nextLevelXP) {
    levelUp(character)
    updateLevel(character)
  }
}

