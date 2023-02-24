export interface IArmor {
  id: string;
  name: string;
  description: string;
  defense: number;
  price: number;
  rarity: string;
};

export const starterArmor: IArmor = {
  id: 'asdss',
  name: "Basic Crap",
  description: "A classic melee weapon, used to slash and stab enemies.",
  defense: 10,
  price: 100,
  rarity: "common"
};