import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScharedModule } from '../schared/schared.module';
import { ChartPieComponent } from './chart-pie/chart-pie.component';
import { StatsService } from './stats.service';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    ChartPieComponent
  ],
  imports: [
    CommonModule,ScharedModule,NgChartsModule
  ],
  exports:[
    ChartPieComponent
  ],
  providers: [StatsService]  
})
export class StatisticModule { }
