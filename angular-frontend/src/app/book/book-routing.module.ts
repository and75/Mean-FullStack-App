/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { BookListComponent } from "./book-list/book-list.component";
import { BookViewComponent } from './book-view/book-view.component';
const BookRoutes: Routes = [
  {
    path: 'book',
    canActivate: [AuthGuardService],
    children: [
      { path: 'all', component: BookListComponent },
      { path: 'view/:id', component : BookViewComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(BookRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class BookRoutingModule {
}
