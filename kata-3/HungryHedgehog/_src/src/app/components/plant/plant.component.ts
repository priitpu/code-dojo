import { Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { Plant } from '../../models';
import { from, map, of, scan, take, takeWhile, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { differenceInSeconds } from 'date-fns';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-plant',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './plant.component.html',
  styleUrl: './plant.component.scss'
})
export class PlantComponent implements OnInit {

  @Input() plant!: Plant;
  @Output() plantHarvested = new EventEmitter<Plant>();

  isReady: boolean = false;
  progress = 0;

  private game = inject(GameService);
  private destroy$ = inject(DestroyRef);

  ngOnInit(): void {
    timer(this.plant.readyAt! - new Date().getTime()).pipe(
      take(1),
      takeUntilDestroyed(this.destroy$)
    ).subscribe(() => this.isReady = true);

    this.game.tick$.pipe(
      takeWhile(() => this.progress < 100),
      takeUntilDestroyed(this.destroy$)
    ).subscribe(() => {
      const diff = this.plant.time - differenceInSeconds(this.plant.readyAt!, new Date());
      this.progress = (diff / this.plant.time) * 100;
    });
  }

  harvest(): void {
    this.plantHarvested.emit(this.plant);
  }

}
