import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GameCategories } from '../../app/shared/game-categories';
import { GamesService, GamesResponse } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  gameCategories = GameCategories;

  games: GamesResponse[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gamesService: GamesService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const category = params.get('category-id');
      if (this.isValidRoute(category)) {
        this.gamesService.getGames(category).subscribe(res => {
          this.games = res;
        }, err => {});
      } else {
        this.router.navigate(['/top']);
      }
    });
  }

  private isValidRoute(category): boolean {
    return this.gameCategories.filter(item => item.id === category).length > 0;
  }

}
