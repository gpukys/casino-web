import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { GamesService } from './games.service';
import { gamesResponseMock, jackpotResponseMock, groupedJackpotResponse } from './games.mock';

describe('GamesService', () => {
  let service: GamesService;
  let httpMock: HttpTestingController;

  const gamesUrl = 'http://stage.whgstage.com/front-end-test/games.php/';
  const jackpotUrl = 'http://stage.whgstage.com/front-end-test/jackpots.php';

  const gamesMock = gamesResponseMock;
  const jackpotResponse = jackpotResponseMock;
  const jackpotGrouped = groupedJackpotResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(GamesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should have correct API urls', () => {
    expect(service.gamesUrl).toEqual(gamesUrl);
    expect(service.jackpotUrl).toEqual(jackpotUrl);
  });

  describe('getGames() should', () => {
    it('return unfiltered values if no category is defined', () => {
      service.getGames().subscribe(res => {
        expect(res).toEqual(gamesMock);
      });
      httpMock.expectOne(service.gamesUrl).flush(gamesMock);
      httpMock.verify();
    });
    it('return filtered values if category is defined', () => {
      const category = 'top';
      service.getGames(category).subscribe(res => {
        expect(res).toEqual(res.filter(item => item.categories.includes(category)));
      });
      httpMock.expectOne(service.gamesUrl).flush(gamesMock);
      httpMock.verify();
    });
    it('return games from "ball", "virtual" and "fun" if "other" category is the argument', () => {
      const category = 'other';
      const groups = ['ball', 'virtual', 'fun'];
      service.getGames(category).subscribe(res => {
        expect(res).toEqual(res.filter(item => groups.some(group => item.categories.includes(group))));
      });
      httpMock.expectOne(service.gamesUrl).flush(gamesMock);
      httpMock.verify();
    });
  });

  describe('getJackpots() should', () => {
    it('return correctly parsed data', () => {
      service.getJackpots().subscribe(res => {
        expect(res).toEqual(jackpotGrouped);
      });
      httpMock.expectOne(service.jackpotUrl).flush(jackpotResponse);
      httpMock.verify();
    });
  });
});
