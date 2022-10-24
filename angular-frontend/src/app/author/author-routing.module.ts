/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorViewComponent } from './author-view/author-view.component';

const AuthorRoutes: Routes = [
  {
    path: 'author',
    canActivate: [AuthGuardService],
    children: [
      { path: 'all', component: AuthorListComponent },
      { path: 'view/:id', component : AuthorViewComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(AuthorRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class AuthorRoutingModule { }
