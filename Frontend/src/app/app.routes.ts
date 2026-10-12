import {Routes} from '@angular/router';
import {MessageListComponent} from './screen/msg-list-component/msg-list-component';
import {ScreenView} from "./screen/screen-view";
import {AddMsgComponent} from "./screen/add-msg-component/add-msg-component";
import {UpdateMsgComponent} from "./screen/update-msg-component/update-msg-component";

export const routes: Routes = [
    {path: 'main', component: ScreenView},
    {path: 'showall', component: MessageListComponent},
    {path: "add-message", component: AddMsgComponent},
    {path: 'update-message/:id', component: UpdateMsgComponent},
    {path: '', redirectTo: '/main', pathMatch: 'full'},
];
