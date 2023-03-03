export interface IEnemy {
    name: string;
    level: number;
    health: number;
    attack: number;
    defense: number;
    isAlive: boolean;
}

export interface IBoss {
    name: string;
    level: number;
    health: number;
    maxDamage: number;
    minDamage: number;
    isAlive: boolean;
    defense: number;
}