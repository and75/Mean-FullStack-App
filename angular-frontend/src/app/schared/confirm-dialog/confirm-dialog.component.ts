/**
* Proteus-app
* Node/MongoDb/Angular/Angular Material - Stack
* by Andrea Porcella 2022
*/
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  ngOnInit(): void {
  }

  confirm(status:boolean){
    this.dialogRef.close(status);
  }
}


