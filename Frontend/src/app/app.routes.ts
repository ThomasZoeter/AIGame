import { Routes, RouterModule } from '@angular/router';
import { NumberListComponent } from './screen/NumListComponent/numlist-component';
import { ScreenView } from "./screen/screen-view";

export const routes: Routes = [
  { path: 'main', component: ScreenView},
  { path: 'numbers', component: NumberListComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full'},
];
