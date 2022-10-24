import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ScharedModule } from '../schared/schared.module';
import { AuthorRoutingModule } from './author-routing.module'
import { AuthorService } from './author.service';
import { TagModule } from '../tag/tag.module';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorViewComponent } from './author-view/author-view.component';
import { AuthorFormComponent } from './author-form/author-form.component';


@NgModule({
  declarations: [
    AuthorListComponent,
    AuthorViewComponent,
    AuthorFormComponent
  ],
  imports: [
    CommonModule,
    ScharedModule,
    FormsModule, 
    ReactiveFormsModule,
    TagModule,
    AuthorRoutingModule
  ],
  providers: [AuthorService]
})
export class AuthorModule { }
