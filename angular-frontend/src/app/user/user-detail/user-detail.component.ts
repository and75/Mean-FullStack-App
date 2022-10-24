/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  filterActivity:any={};
  subscription:any=[]
  contentID:string=null;
  data:User;

  constructor(
    private titleService:Title,
    private route: ActivatedRoute,
    private service:UserService) {
   }

  ngOnInit(): void {
    this.titleService.setTitle('Personal Page');
    this.route.paramMap.subscribe(params => {
      this.contentID = this.route.snapshot.params['id'];
      console.log('NgOnInit->UserDetailComponent', this.contentID)
      if(this.contentID){
        this.getData();
        this.filterActivity={subject:this.contentID};
      } 
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getData(){
    this.subscription = this.service.getUser(this.contentID).subscribe((res):any=>{
      if (res.succes == true) {
        this.data = new User(res.payload.data);
        console.log('Member data', this.data)
      }
    })
  }

}
