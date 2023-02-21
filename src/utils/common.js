
import Enemies from '../data/enemies.json'
import Weapons from '../data/weapons.json'

export const performSkillCheck = (attributeLevel, difficultyNumber, diceSize) => {
  let successes = 0;
  for(let i = 0; i < attributeLevel; i++) {
    let result = Math.floor(Math.random()*diceSize) + 1
    if (result >= difficultyNumber) {
      successes++
    }
  }
  return successes
}


// calculateDamage

export const calculateDamage = (damageAmount, target) => {
  target.health -= damageAmount
  if(target.health <= 0) {
    return {...target, isAlive: false}
  }
  return target
}
const getRarity = (difficultyFactor) => {
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

export const generateLoot = (difficulty) => {
  console.log('You killed a level ' + difficulty + ' enemy!')
  const rarity = getRarity(difficulty)
  const loot = Weapons[rarity + '_weapons'][Math.floor(Math.random()*Weapons[rarity + '_weapons'].length)]
  return loot
}

export const generateCoins = (difficulty) => {
  const amount = Math.floor(Math.random()*10)*difficulty
  return amount
}

export const generateShopItems = (progressFactor) => {
  

  const getItems = (quality) => {
    let shopItems = []
    for (let i = 0; i<5; i++){
      shopItems.push(Weapons[quality + '_weapons'][Math.floor(Math.random()*Weapons[quality + '_weapons'].length)])
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
}



// levelUp

export const levelUp = (character) => {
  character.level += 1;
  character.health += 10;
  character.availableAttributePoints += 1;
}

// checkInventory

export const checkInventory = (character) => {
  character.inventory.forEach((item) => {
    console.log(item)
  })
}


// generateEnemy
// when more enemies are generated to data/enemies.json -> return enemies randomly from specific difficulty tier
export const generateEnemy = (difficulty) => {
  const enemies = Enemies.enemies.filter(enemy => enemy.level === difficulty)
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


// performAttack

export const performAttack = (attacker, target, attackItem) => {
  const damageAmount = (attacker.attributes.str + attacker.damage + attackItem.damage) - target.defense
  if(damageAmount <= 0) {
    console.log(`${target.name} took no damage! It has too much defense!`)
    return target
  } else {
    console.log(`${target.name} took ${damageAmount} damage!`)
    return calculateDamage(damageAmount, target)
  } 
}
// Level Curve
// Find required XP for X level
const getLevelExperience = (level) => {
  return Math.floor(100 * Math.pow(1.1, level));
}


// checkForLevelUp
// Required after each action that gives XP

export const checkForLevelUp = (player, earnedXP) => {
  if(player.experience + earnedXP >= getLevelExperience(player.level+1)) {
    levelUp(player)
  }
}