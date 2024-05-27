import { Component, Input, OnInit } from '@angular/core';
import { ThreadComment } from 'src/app/models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment!: ThreadComment
  @Input() step: number = 0;
  @Input() isFirst: boolean = false;
  @Input() isLast: boolean = false;

  grid?: string

  ngOnInit(): void {
    const cols = [];
    for (let index = 1; index < this.step + 1; index++) {
      cols.push('3.625rem');
    }

    this.grid = `${cols.join(' ')} repeat(2, auto)`;
  }

}
