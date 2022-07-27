/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './authentication.component';
import { AuthenticationRoutingModule } from './auth-routing.module';
import { ScharedModule } from '../schared/schared.module';

@NgModule({
  declarations: [
    AuthenticationComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    ScharedModule,
    AuthenticationRoutingModule
  ],
  exports : [
    AuthenticationComponent
  ],
  bootstrap: [AuthenticationComponent]
})
export class AuthenticationModule { }
