import { TestBed, async, tick, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { routes } from './app-routing.module';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GamesComponent } from './games/games.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        GamesComponent
      ],
      providers: [
        Location
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
  });

  it('navigate to "" redirects you to /top', fakeAsync(() => {
    router.initialNavigation();
    router.navigate(['']);
    tick();
    expect(location.path()).toBe('/top');
  }));

  it('should render the navbar with all the categories', () => {
    fixture.detectChanges();
    component.gameCategories.forEach((e, idx) => {
      expect(compiled.querySelectorAll('nav a')[idx].textContent).toContain(e.title);
    });
    expect(compiled.querySelectorAll('nav a').length).toEqual(component.gameCategories.length);
  });
});
