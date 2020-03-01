import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { GamesComponent } from './games.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {routes } from '../app-routing.module';
import { Location } from '@angular/common';

describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;
  let httpMock: HttpTestingController;
  let router: Router;
  let route: ActivatedRoute;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      declarations: [ GamesComponent ],
      providers: [
        Location
      ]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  }));



  beforeEach(() => {
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute)
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;

    router.initialNavigation();
  });

  it('navigating to a non valid category redirects you to /top', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(location.path()).toBe('/top');
    router.navigate(['/not-valid']);
    tick();
    component.ngOnDestroy();
    component.ngOnInit();
    tick();
    expect(location.path()).toBe('/top');
    router.navigate(['/new']);
    tick();
    component.ngOnDestroy();
    component.ngOnInit();
    expect(location.path()).toBe('/new');
    component.ngOnDestroy();
  }));
});
