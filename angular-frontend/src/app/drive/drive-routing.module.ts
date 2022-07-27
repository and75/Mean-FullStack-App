import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { DriveListComponent } from './drive-list/drive-list.component';
import { DriveViewComponent } from './drive-view/drive-view.component';
const DriveRoutes: Routes = [
  {
    path: 'drive',
    canActivate: [AuthGuardService],
    children: [
      { path: 'all', component: DriveListComponent },
      { path: 'view/:id', component : DriveViewComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(DriveRoutes),
  ],
  exports: [
    RouterModule
  ]
})

export class DriveRoutingModule { }
