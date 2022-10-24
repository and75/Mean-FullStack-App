/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/_models/book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit, OnDestroy {

  contentID:number=null
  data:Book;
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
    this.visible[0] = false;
    this.visible[1] = false;
  }

  constructor(
    private titleService:Title,
    private route: ActivatedRoute,
    private service:BookService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Book detail');
    this.route.paramMap.subscribe(params => {
      this.contentID = this.route.snapshot.params['id'];
      if(this.contentID){
        this.getContent();
      } 
    });
  }

  ngOnDestroy(){
    this.pdfData = null;
  }

  getContent(){
    this.service.getBook(this.contentID).subscribe((res):any=>{
      if (res.succes == true) {
        this.data = new Book(res.payload.data);
        console.log('Book view', this.data)
      }
    })
  }

}
