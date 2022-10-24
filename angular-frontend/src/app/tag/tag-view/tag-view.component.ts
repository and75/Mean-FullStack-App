import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Tag } from 'src/app/_models/tag';
import { TagService } from '../tag.service';
import { TagFormComponent } from '../tag-form/tag-form.component';
import { AlertService } from 'src/app/alerts/alert.service';

@Component({
  selector: 'app-tag-view',
  templateUrl: './tag-view.component.html',
  styleUrls: ['./tag-view.component.scss']
})
export class TagViewComponent implements OnInit {

  contentID:number=null
  data:Tag;

  constructor(
    private titleService:Title,
    private route: ActivatedRoute,
    private service:TagService,
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
        this.data = new Tag(res.payload.data);
        this.titleService.setTitle('Tag :'+this.data.label);
      }
    })
  }

  edit(row) {
    const addDialog = this.dialog.open(TagFormComponent, {
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
