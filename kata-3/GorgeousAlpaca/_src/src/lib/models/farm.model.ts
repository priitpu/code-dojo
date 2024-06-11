export interface Seed {
  type: "blue" | "red" | "purple" | "white" | "orange";
  cost: number;
  value: number;
  growthDuration: number;
  plantedAt?: number;
}

export type Plot = { seed?: Seed; available?: boolean };

export type Farm = { [key: string]: Plot };
