/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { VocabularyListComponent } from "./vocabulary-list/vocabulary-list.component";
import { VocabularyViewComponent } from './vocabulary-view/vocabulary-view.component';

const VocabularyRoutes: Routes = [
  {
    path: 'vocabulary',
    canActivate: [AuthGuardService],
    children: [
      { path: 'all', component: VocabularyListComponent },
      { path: 'view/:id', component : VocabularyViewComponent}

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(VocabularyRoutes),
  ],
  exports: [
    RouterModule
  ]
})

export class VocabularyRoutingModule {}
