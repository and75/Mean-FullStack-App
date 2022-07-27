/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './../auth-guard.service';
import { UserListComponent } from "./user-list/user-list.component";

const UserRoutes: Routes = [
  {
    path: 'members',
    canActivate: [AuthGuardService],
    children: [
      { path: 'all', component: UserListComponent }
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
