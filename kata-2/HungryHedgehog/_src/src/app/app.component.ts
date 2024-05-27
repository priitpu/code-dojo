import { Component } from '@angular/core';
import { ThreadComment } from './models';
import { data } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'attack-of-the-lines';

  comments: ThreadComment[] = data;
}
