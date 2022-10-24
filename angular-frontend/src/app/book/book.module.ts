/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BookRoutingModule } from './book-routing.module';
import { ScharedModule } from '../schared/schared.module';
import { TagModule } from '../tag/tag.module';
import { AuthorModule } from '../author/author.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookViewComponent } from './book-view/book-view.component';
import { BookFormComponent } from './book-form/book-form.component';
import { BookService } from './book.service';
import { BookPageModule } from './book-page/book-page.module';

@NgModule({
  declarations: [
    BookListComponent,
    BookViewComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule, BookRoutingModule, TagModule,AuthorModule,ScharedModule,ReactiveFormsModule,FormsModule, BookPageModule
  ],
  providers: [BookService]
})
export class BookModule { }
