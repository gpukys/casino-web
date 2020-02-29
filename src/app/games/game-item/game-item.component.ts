import { Component, OnInit, Input } from '@angular/core';
import { GamesResponse } from '../games.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {

  constructor() { }

  @Input() game: GamesResponse;

  ngOnInit(): void {
  }

}
