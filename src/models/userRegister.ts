import { IWeapon } from "./weapon";
import { IAttributes } from "./attributes";
import { IArmor } from "./armor";

export interface IUserRegister {
    username: string;
    password: string;
    repeatPassword: string;
    equippedWeapon: IWeapon;
    equippedArmor: IArmor;
    attributes: IAttributes;
    coins: number;
    experience:number;
    level: number;
    highestLevelOfKilledMonsters: number;
    weapons: IWeapon[]
    armor: IArmor[]
    health: number
    availableAttributePoints: number
  }