/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { TagListComponent } from "./tag-list/tag-list.component";
const TagRoutes: Routes = [
  {
    path: 'tags',
    canActivate: [AuthGuardService],
    children: [
      { path: 'all', component: TagListComponent }
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
export class TagRoutingModule {
}
