/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DriveService } from '../drive.service';

@Component({
  selector: 'app-drive-view',
  templateUrl: './drive-view.component.html',
  styleUrls: ['./drive-view.component.scss']
})
export class DriveViewComponent {

 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DriveViewComponent>,
    private service: DriveService) {
  }

  ngOnDestroy(){
    this.cleanData();
  }

  cleanData(){
    console.info('Clean File Data and Subscription');
    this.data = null;
  }

}
