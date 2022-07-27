/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './alert.component';

@NgModule({
    imports: [CommonModule],
    declarations: [AlertComponent],
    exports: [AlertComponent]
})
export class AlertModule { }