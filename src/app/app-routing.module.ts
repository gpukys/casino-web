import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games/games.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'top'},
  {path: '', children: [
    { path: ':category-id', component: GamesComponent }
  ]},
  { path: '**', pathMatch: 'full', redirectTo: 'top' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
