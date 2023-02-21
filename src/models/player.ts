import { IAttributes } from "./attributes"
import { IWeapon } from "./weapon";

export interface IPlayer {
    id: string;
    name: string;
    level: number;
    attributes: IAttributes;
    health: number;
    damage: number;
    experience: number;
    availableAttributePoints: number;
    equippedWeapon: IWeapon;
    weapons: IWeapon[];
    coins: number;
    highestLevelOfKilledMonsters: number;
};