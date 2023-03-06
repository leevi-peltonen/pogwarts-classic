import { IWeapon } from "./weapon";
import { IArmor } from "./armor";

export interface ICharacter {
  name: string,
  level: number,
  experience: number,
  health: number,
  maxHealth: number,
  availableAttributePoints: number,
  strength: number,
  dexterity: number,
  intelligence: number,
  coins: number,
  highestLevelOfKilledMonsters: number,
  inventoryWeapons?: IWeapon[],
  inventoryArmor?: IArmor[],
  equippedWeapon?: IWeapon,
  equippedArmor?: IArmor,
  achievements: number[]
}