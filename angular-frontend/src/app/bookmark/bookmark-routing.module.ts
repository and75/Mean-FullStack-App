/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { BookmarkViewComponent } from './bookmark-view/bookmark-view.component';

const TagRoutes: Routes = [
  {
    path: 'bookmark',
    canActivate: [AuthGuardService],
    children: [
      { path: 'all', component: BookmarkListComponent },
      { path: 'view/:id', component : BookmarkViewComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(TagRoutes),
  ],
  exports: [
    RouterModule
  ]
})

export class BookmarkRoutingModule {
}
