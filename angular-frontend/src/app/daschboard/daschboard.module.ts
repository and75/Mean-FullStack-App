/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScharedModule } from '../schared/schared.module';
import { DaschboardComponent } from './daschboard.component';
import { StatisticModule } from '../statistic/statistic.module';


@NgModule({
  declarations: [DaschboardComponent],
  imports: [
    CommonModule,ScharedModule,StatisticModule
  ]
})
export class DaschboardModule {}
