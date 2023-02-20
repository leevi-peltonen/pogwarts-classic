import { IAttributes } from "./attributes"
import { IWeapon } from "./weapon";
import { IInventory } from "./inventory";

export interface IPlayer {
    name: string;
    level: number;
    attributes: IAttributes;
    health: number;
    damage: number;
    experience: number;
    availableAttributePoints: number;
    equippedWeapon: IWeapon;
    inventory: IInventory;
};