/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { Component, Inject, OnDestroy } from '@angular/core';
 import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-bookmark-view',
  templateUrl: './bookmark-view.component.html',
  styleUrls: ['./bookmark-view.component.scss']
})
export class BookmarkViewComponent implements OnDestroy {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<BookmarkViewComponent>) {
      console.log(this.data);
  }

  ngOnDestroy(){
    this.cleanData();
  }

  cleanData(){
    console.info('Clean Bookmarks view data');
    this.data = null;
  }

  close() {
    this.dialogRef.close();
  }

}
