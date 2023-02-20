import { IWeapon } from "./weapon";

export interface IInventory {
    weapons: IWeapon[];
    coins: number;
}