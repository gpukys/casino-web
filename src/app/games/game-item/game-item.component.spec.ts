import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameItemComponent } from './game-item.component';
import { gamesResponseMock } from '../games.mock';

describe('GameItemComponent', () => {
  let component: GameItemComponent;
  let fixture: ComponentFixture<GameItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameItemComponent);
    component = fixture.componentInstance;
  });

  it('should not show ribbon if category is not new or top', () => {
    component.game = gamesResponseMock[0];
    fixture.detectChanges();
    expect(component.ribbonLabel).toBeFalsy();
  });

  it('should show ribbon if category is top', () => {
    component.game = gamesResponseMock[1];
    fixture.detectChanges();
    expect(component.ribbonLabel).toEqual('top');
  });

  it('should show ribbon if category is new', () => {
    component.game = gamesResponseMock[2];
    fixture.detectChanges();
    expect(component.ribbonLabel).toEqual('new');
  });

  it('should not show ribbon if category is new, but route is also new', () => {
    component.game = gamesResponseMock[2];
    component.hideRibbonCategory = 'new';
    fixture.detectChanges();
    expect(component.ribbonLabel).toBeFalsy();
  });

  it('should not show ribbon if category is top, but route is also top', () => {
    component.game = gamesResponseMock[1];
    component.hideRibbonCategory = 'top';
    fixture.detectChanges();
    expect(component.ribbonLabel).toBeFalsy();
  });

  it('should show new ribbon if category is top and new, but route is top', () => {
    component.game = gamesResponseMock[3];
    component.hideRibbonCategory = 'top';
    fixture.detectChanges();
    expect(component.ribbonLabel).toEqual('new');
  });

  it('should show top ribbon if category is top and new, but route is new', () => {
    component.game = gamesResponseMock[3];
    component.hideRibbonCategory = 'new';
    fixture.detectChanges();
    expect(component.ribbonLabel).toEqual('top');
  });
});
