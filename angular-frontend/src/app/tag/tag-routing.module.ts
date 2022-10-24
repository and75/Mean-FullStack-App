/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { TagListComponent } from "./tag-list/tag-list.component";
import { TagViewComponent } from './tag-view/tag-view.component';
const TagRoutes: Routes = [
  {
    path: 'tag',
    canActivate: [AuthGuardService],
    children: [
      { path: 'all', component: TagListComponent },
      { path: 'view/:id', component : TagViewComponent}
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
