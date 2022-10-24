/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { Component, OnInit, OnDestroy } from '@angular/core';
 import { Title } from '@angular/platform-browser';
 import { ActivatedRoute, Router } from '@angular/router';
 import { MatDialog } from '@angular/material/dialog';
 import { Bookmark } from 'src/app/_models/bookmark';
 import { BookmarkService } from '../bookmark.service';
 import { BookmarkFormComponent } from '../bookmark-form/bookmark-form.component';
 import { AlertService } from 'src/app/alerts/alert.service';

@Component({
  selector: 'app-bookmark-view',
  templateUrl: './bookmark-view.component.html',
  styleUrls: ['./bookmark-view.component.scss']
})
export class BookmarkViewComponent implements OnInit, OnDestroy {

  contentID:number=null
  data:Bookmark;

  constructor(
    private titleService:Title,
    private route: ActivatedRoute,
    private service:BookmarkService,
    private dialog:MatDialog,
    private alertService:AlertService) { }

    
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.contentID = this.route.snapshot.params['id'];
      if(this.contentID){
        this.getContent();
      } 
    });
  }

  ngOnDestroy(){}

  getContent(){
    this.service.getOne(this.contentID).subscribe((res):any=>{
      if (res.succes == true) {
        this.data = new Bookmark(res.payload.data);
        this.titleService.setTitle('Tag :'+this.data.label);
      }
    })
  }

  edit(row) {
    const addDialog = this.dialog.open(BookmarkFormComponent, {
      data  : row
    });
    addDialog.afterClosed().subscribe(result => {
      if (result) {
        this.service.update(result.data._id, result.form).subscribe(res => {
          if (res.succes) {
            this.getContent();
            this.alertService.success(res.mess, { 'keepAfterRouteChange': true, 'autoClose': true, 'spinner': false })
          } else {
            this.alertService.error(res.mess, { 'keepAfterRouteChange': false, 'autoClose': true, 'spinner': false })
          }
        })
      }
    });
  }
}
