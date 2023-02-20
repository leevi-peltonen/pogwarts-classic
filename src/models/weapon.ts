export interface IWeapon {
    name: string;
    description: string;
    damage: number;
    price: number;
    rarity: string;
};

export const starterWeapon: IWeapon = {
  name: "Basic Sword",
  description: "A classic melee weapon, used to slash and stab enemies.",
  damage: 10,
  price: 100,
  rarity: "common"
};