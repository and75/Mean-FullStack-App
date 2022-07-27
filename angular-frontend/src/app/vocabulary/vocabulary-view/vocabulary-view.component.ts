/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vocabulary-view',
  templateUrl: './vocabulary-view.component.html',
  styleUrls: ['./vocabulary-view.component.scss']
})
export class VocabularyViewComponent implements OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<VocabularyViewComponent>) {
    console.log(this.data);
  }

  ngOnDestroy() {
    this.cleanData();
  }

  cleanData() {
    console.info('Clean Vocabolary view data');
    this.data = null;
  }

  close() {
    this.dialogRef.close();
  }

}
