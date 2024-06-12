import { Bed, Plant } from "./models";

export const seeds: Plant[] = [
  {
    cost: 10,
    icon: 'grass',
    profit: 15,
    time: 10
  },
  {
    cost: 20,
    icon: 'spa',
    profit: 35,
    time: 20
  },
  {
    cost: 50,
    icon: 'local_florist',
    profit: 75,
    time: 30
  }
];

export const beds = () => {
  const _beds: Bed[] = [];
  do {
    _beds.push({});
  } while (_beds.length < 9);

  return _beds;
}

export const money = 100;