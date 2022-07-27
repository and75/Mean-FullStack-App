import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ScharedModule } from 'src/app/schared/schared.module';
import { PageListComponent } from './page-list/page-list.component';
import { PageViewComponent } from './page-view/page-view.component';
import { PageFormComponent } from './page-form/page-form.component';
import { BookPageService } from './book-page.service';


@NgModule({
  declarations: [
    PageListComponent,
    PageViewComponent,
    PageFormComponent
  ],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule,ScharedModule
  ],
  exports : [PageListComponent],
  providers: [BookPageService]
})
export class BookPageModule { }
