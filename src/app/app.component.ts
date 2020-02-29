import { Component } from '@angular/core';
import { GameCategories } from '../app/shared/game-categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  gameCategories = GameCategories;
}
