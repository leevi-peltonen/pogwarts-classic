export interface IWeapon {
    name: string;
    description: string;
    damage: number;
    critDamage: number;
    critChance: number;
    stunChance: number;
    poisonChance: number;
    lifestealChance: number;
    price: number;
    rarity: string;
    weaponPerk: IWeaponPerk;
};

export interface IWeaponPerk {
  minDamage: number;
  maxDamage: number;
  critDamage: number;
  critChance: number;
  damage: number;
  stunChance: number;
  poisonChance: number;
  lifestealChance: number;
}