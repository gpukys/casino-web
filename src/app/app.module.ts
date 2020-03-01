import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { HttpClientModule } from '@angular/common/http';
import { GamesService } from './games/games.service';
import { GameItemComponent } from './games/game-item/game-item.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    GamesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
