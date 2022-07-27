import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ScharedModule } from '../schared/schared.module';
import { BookmarkService } from './bookmark.service';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { BookmarkViewComponent } from './bookmark-view/bookmark-view.component';
import { BookmarkFormComponent } from './bookmark-form/bookmark-form.component';
import { BookmarkRoutingModule } from './bookmark-routing.module';


@NgModule({
  declarations: [
    BookmarkListComponent,
    BookmarkViewComponent,
    BookmarkFormComponent
  ],
  imports: [
    CommonModule,ScharedModule,FormsModule, ReactiveFormsModule, BookmarkRoutingModule
  ],
  providers:[BookmarkService]
})
export class BookmarkModule { }
