import { IArmor } from "./armor";
import { IAttributes } from "./attributes"
import { IWeapon } from "./weapon";

export interface IPlayer {
    id: string;
    username: string;
    level: number;
    attributes: IAttributes;
    health: number;
    experience: number;
    availableAttributePoints: number;
    equippedWeapon: IWeapon;
    equippedArmor: IArmor;
    weapons: IWeapon[];
    armor: IArmor[];
    coins: number;
    highestLevelOfKilledMonsters: number;
};