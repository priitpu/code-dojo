import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kata01',
  templateUrl: './kata01.component.html',
  styleUrls: ['./kata01.component.scss']
})
export class Kata01Component implements OnInit {
  numberOfCards: number = 3;
  cards: number[] = Array(this.numberOfCards).fill(1).map((c,i) => i);

  constructor() { }

  ngOnInit(): void {
  }

}
