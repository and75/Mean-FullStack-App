import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ScharedModule } from '../schared/schared.module';
import { TagRoutingModule } from './tag-routing.module'
import { TagListComponent } from './tag-list/tag-list.component';
import { TagViewComponent } from './tag-view/tag-view.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { TagService } from './tag.service';

@NgModule({
  declarations: [
    TagListComponent,
    TagViewComponent,
    TagFormComponent
  ],
  imports: [
    CommonModule,
    ScharedModule,
    FormsModule, ReactiveFormsModule,
    TagRoutingModule
  ],
  exports:[],
  providers: [TagService]
})
export class TagModule { }
