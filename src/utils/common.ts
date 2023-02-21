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
  if(target.health <= 0) {
    return {...target, isAlive: false}
  }
  return target
}
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
  const amount = Math.floor(Math.random()*10)*difficulty
  return amount
}

/*
export const generateShopItems = (progressFactor: number): IWeapon[] => {
  
  const getItems = (quality: string): IWeapon[] => {
    let shopItems = []
    for (let i = 0; i<5; i++){
      shopItems.push(Weapons[quality + '_weapons' as keyof typeof Weapons][Math.floor(Math.random() * Weapons[quality + '_weapons' as keyof typeof Weapons].length)]);
    }
    return shopItems
  }

  if(progressFactor <=1) {
    return getItems('common')
  }
  else if(progressFactor <=2) {
    return getItems('uncommon')
  }
  else if(progressFactor <=3) {
    return getItems('rare')
  }
  else if(progressFactor <=4) {
    return getItems('epic')
  }
  else if(progressFactor <=5) {
    return getItems('legendary')
  }
  else {
    return [] as IWeapon[]
  }
}
*/

 
export const levelUp = (character: IPlayer) => {
  character.level += 1
  character.health += 10
  character.availableAttributePoints += 1
}

// generateEnemy
export const generateEnemy = (difficulty: number) => {
  const enemies = Enemies.enemies.filter((enemy) => enemy.level === difficulty)
  return enemies
}

// determineAmountOfEnemies
export const determineAmountOfEnemies = () => {
  const randomNumber = Math.random();
  
  if (randomNumber < 0.6) {
    return 1;
  } else if (randomNumber < 0.8) {
    return 2;
  } else if (randomNumber < 0.95) {
    return 3;
  } else if (randomNumber < 0.99){
    return 4;
  } else {
    return 5;
  }
}


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
const getLevelExperience = (level: number) => {
  return Math.floor(100 * Math.pow(1.1, level))
}


// checkForLevelUp
export const checkForLevelUp = (player: IPlayer, earnedXP: number) => {
  if (player.experience + earnedXP >= getLevelExperience(player.level + 1)) {
    levelUp(player)
  }
}