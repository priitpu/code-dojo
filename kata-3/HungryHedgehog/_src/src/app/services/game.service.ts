import { Injectable, signal } from '@angular/core';
import { Plant } from '../models';
import { beds, money, seeds } from '../conf';
import { Subject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  plants$ = signal(seeds);
  beds$ = signal(beds());
  tick$ = new Subject<void>();
  money$ = signal(money);

  constructor() { 
    interval(1000).subscribe(() => this.tick$.next());
  }


  plantSeed(seed: Plant, idx: number): void {
    const beds = this.beds$();
    const plantedAt = new Date().getTime();
    beds[idx].plant = {...seed, plantedAt: plantedAt, readyAt: plantedAt + seed.time * 1000};
    this.beds$.set(beds);
    this.money$.set(this.money$() - seed.cost);
  }

  harvestPlant(idx: number): void {
    const beds = this.beds$();
    let plant = beds[idx].plant;

    if (plant) {
      this.money$.set(this.money$() + plant.profit);
      delete beds[idx].plant;
    }

    this.beds$.set(beds);
  }
}
