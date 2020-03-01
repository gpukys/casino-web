import { Component, OnInit, Input } from '@angular/core';
import { GamesResponse } from '../games.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss']
})
export class GameItemComponent implements OnInit {

  showRibbon: string;

  constructor() { }

  @Input() game: GamesResponse;
  @Input() hideRibbonCategory: string;
  @Input() jackpot: number;

  ngOnInit() {
    this.showRibbon = this.game.categories.filter(e => (e === 'new' || e === 'top') && e !== this.hideRibbonCategory)[0];
  }

}
