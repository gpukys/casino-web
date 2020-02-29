import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private gamesUrl = 'http://stage.whgstage.com/front-end-test/games.php/';

  constructor(
    private http: HttpClient
  ) { }

  getGames(category?: string): Observable<GamesResponse[]> {
    return this.http.get<GamesResponse[]>(this.gamesUrl)
      .pipe(
        map(
          results => category ? results.filter(item => item.categories.includes(category)) : results
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
