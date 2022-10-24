/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

 import { Component, OnInit, OnDestroy } from '@angular/core';
 import { Title } from '@angular/platform-browser';
 import { ActivatedRoute, Router } from '@angular/router';
 import { MatDialog } from '@angular/material/dialog';
 import { Author } from 'src/app/_models/author';
 import { AuthorService } from '../author.service';
 import { AuthorFormComponent } from '../author-form/author-form.component';
 import { AlertService } from 'src/app/alerts/alert.service';

@Component({
  selector: 'app-author-view',
  templateUrl: './author-view.component.html',
  styleUrls: ['./author-view.component.scss']
})
export class AuthorViewComponent implements OnInit {

  contentID:number=null
  data:Author;

  constructor(
    private titleService:Title,
    private route: ActivatedRoute,
    private service:AuthorService,
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
        this.data = new Author(res.payload.data);
        this.titleService.setTitle('Author :'+this.data.fullname);
      }
    })
  }

  edit(row) {
    const addDialog = this.dialog.open(AuthorFormComponent, {
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
