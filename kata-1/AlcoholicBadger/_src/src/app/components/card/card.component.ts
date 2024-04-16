import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() cardPersonImgUrl: string = './assets/images/anonüümnetüüp.jpg';
  @Input() cardPersonImgAlt: string = 'some dude';
  @Input() cardPersonImgSize: string = 'medium';
  @Input() cardPersonName: string = 'Tiit';
  @Input() cardPersonCompany: string = 'Tiit & Teet OÜ';
  @Input() cardHeading: string = 'Lorem ipsum dolor sit';
  @Input() cardContent: string =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  constructor() {}

  ngOnInit(): void {}
}
