
import Weapons from "../data/weapons.json"
import { IPlayer } from "../models/player"

///////////////////////COMBAT////////////////////////////
// calculateDamage
export const calculateDamage = (attackRating: number, targetDefenseRating: number): number => {
  const hitChance = 1 - targetDefenseRating / 200;
  const damage = attackRating * hitChance * (0.5 + Math.random() * 0.1);
  return damage;
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
export const generateLoot = (difficulty: number) => {
  console.log("You killed a level " + difficulty + " enemy!")
  const rarity = getRarity(difficulty)
  const weaponList = rarity + "_weapons";
  const index = Math.floor(Math.random() * Weapons[weaponList as keyof typeof Weapons].length);
  const loot = Weapons[weaponList as keyof typeof Weapons][index];
  return loot;
}

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
export const levelUp = (character: IPlayer) => {
  character.level += 1
  character.health += 10
  character.availableAttributePoints += 1
}


// Level Curve
const getLevelExperience = (level: number) => {
  return Math.floor(100 * Math.pow(1.1, level))
}


// check if player reached next level
export const checkForLevelUp = (player: IPlayer, earnedXP: number) => {
  if (player.experience + earnedXP >= getLevelExperience(player.level + 1)) {
    levelUp(player)
  }
}

