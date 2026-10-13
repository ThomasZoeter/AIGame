import { Routes } from '@angular/router';
import { MessageListComponent } from './screen/msg-list-component/msg-list-component';
export const routes: Routes = [
  { path: 'showall', component: MessageListComponent },
  { path: 'add-message', component: MessageListComponent },
  { path: 'update-message/:id', component: MessageListComponent },
  { path: '**', redirectTo: 'showall' },
];
