import { Routes, RouterModule } from '@angular/router';
import { NumberListComponent } from './screen/NumListComponent/numlist-component';
import { ScreenView } from "./screen/screen-view";
import {AddNumComponent} from "./screen/add-num-component/add-num-component";

export const routes: Routes = [
  { path: 'main', component: ScreenView},
  { path: 'showall', component: NumberListComponent},
  { path: "add-number", component: AddNumComponent},
  { path: '', redirectTo: '/main', pathMatch: 'full'},
];
