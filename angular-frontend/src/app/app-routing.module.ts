/**
 * AppPost
 * "Medium" style application
 * Bootstrap 4.x sass style
 * by Andrea Porcella 2021
 */

 import { NgModule } from '@angular/core';
 import { Routes, RouterModule } from '@angular/router';
 import { AuthenticationRoutingModule } from './authentication/auth-routing.module';
 import { AuthGuardService } from './auth-guard.service';
 import { PageNotfoundComponent } from './page-notfound.component';
 import { DaschboardComponent } from './daschboard/daschboard.component';
 // routes
 const appRoutes: Routes = [{
     path: '',
     canActivate: [AuthGuardService],
     children: [
       { path: '', redirectTo: 'home', pathMatch: 'full' },
       { path: 'home', component: DaschboardComponent },
       { path: '**', component: PageNotfoundComponent }
     ]
   } 
 ];
 
 @NgModule({
   imports: [
     RouterModule.forRoot(appRoutes),
     AuthenticationRoutingModule
   ],
   exports: [
     RouterModule
   ]
 })
 export class AppRoutingModule {}
