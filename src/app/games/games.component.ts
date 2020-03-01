import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameCategories } from '../../app/shared/game-categories';
import { GamesService, GamesResponse, JackpotsParsed } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit, OnDestroy {

  gameCategories = GameCategories;

  games: GamesResponse[];
  jackpots: JackpotsParsed;
  hideRibbonCategory: string;

  jackpotInterval;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category-id');
      this.hideRibbonCategory = category === 'new' || category === 'top' ? category : '';
      if (this.isValidRoute(category)) {
        this.gamesService.getGames(category).subscribe(res => {
          this.games = res;
        }, err => {});
      } else {
        this.router.navigate(['/top']);
      }
    });

    this.getJackpots();

    this.jackpotInterval = setInterval(() => {
      this.getJackpots();
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.jackpotInterval) {
      clearInterval(this.jackpotInterval);
    }
  }

  private isValidRoute(category): boolean {
    return this.gameCategories.filter(item => item.id === category).length > 0;
  }

  private getJackpots() {
    this.gamesService.getJackpots().subscribe(res => {
      this.jackpots = res;
    });
  }
}
