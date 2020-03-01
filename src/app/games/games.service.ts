import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private gamesUrl = 'http://stage.whgstage.com/front-end-test/games.php/';
  private jackpotUrl = 'http://stage.whgstage.com/front-end-test/jackpots.php';

  constructor(
    private http: HttpClient
  ) { }

  getGames(category?: string): Observable<GamesResponse[]> {
    return this.http.get<GamesResponse[]>(this.gamesUrl)
      .pipe(
        map(
          results => {
            if (category) {
              if (category === 'other') {
                const groups = ['ball', 'virtual', 'fun'];
                return results.filter(item => groups.some(group => item.categories.includes(group)));
              } else {
                return results.filter(item => item.categories.includes(category));
              }
            }
            return results;
          }
        )
      );
  }

  getJackpots(): Observable<JackpotsParsed> {
    return this.http.get<JackpotsResponse[]>(this.jackpotUrl)
      .pipe(
        map(
          results => {
            const parsed: JackpotsParsed = {};
            results.map(el => {
              parsed[el.game] = el.amount;
            });
            return parsed;
          }
        )
      );
  }

}

export interface GamesResponse {
  categories: string[];
  name: string;
  image: string;
  id: string;
}

export interface JackpotsResponse {
  game: string;
  amount: number;
}

export interface JackpotsParsed {
  [game: string]: number;
}
