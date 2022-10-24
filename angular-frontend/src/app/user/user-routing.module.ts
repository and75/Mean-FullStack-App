/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './../auth-guard.service';
import { UserListComponent } from "./user-list/user-list.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";

const UserRoutes: Routes = [
  {
    path: 'members',
    canActivate: [AuthGuardService],
    children: [
      { path: 'all', component: UserListComponent },
      { path: 'view/:id', component : UserDetailComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(UserRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {
}
