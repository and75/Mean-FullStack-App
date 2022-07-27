/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

 import { Component, OnInit, OnDestroy } from '@angular/core';
 import { Title } from '@angular/platform-browser';
 import { ActivatedRoute, Router } from '@angular/router';
 import { Page} from 'src/app/_models/page';
 import { BookPageService } from '../book-page.service';

@Component({
  selector: 'app-page-view',
  templateUrl: './page-view.component.html',
  styleUrls: ['./page-view.component.scss']
})
export class PageViewComponent implements OnInit {

  contentID:string=null
  data:Page;
  pdfData:any=null;
  public page = 2;
  public pageLabel!: string;

  public visible = { 0: true };

  public activateTab(tab: number): void {
    this.hideOtherPDFs();
    setTimeout(() => {
      this.visible[tab] = true;
    }, 100);
  }

  public hideOtherPDFs(): void {
    console.log('Hiding');
    this.visible[0] = false;
    this.visible[1] = false;
  }

  constructor(
    private titleService:Title,
    private route: ActivatedRoute,
    private service:BookPageService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Post detail');
    this.route.paramMap.subscribe(params => {
      this.contentID = this.route.snapshot.params['id'];
      if(this.contentID){
        this.getContent();
      } 
    });
  }

  ngOnDestroy():void{}

  getContent(){
    this.service.getPage(this.contentID).subscribe((res):any=>{
      console.log(res);
      if (res.succes == true) {
        this.data = new Page(res.payload.data);
        console.log('Book view', this.data)
      }
    })
  }

}
