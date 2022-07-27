/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScharedModule } from '../schared/schared.module';
import { DaschboardComponent } from './daschboard.component';



@NgModule({
  declarations: [DaschboardComponent],
  imports: [
    CommonModule,ScharedModule
  ]
})
export class DaschboardModule { }
