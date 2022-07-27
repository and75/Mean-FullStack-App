import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ScharedModule } from '../schared/schared.module';
import { TagRoutingModule } from './tag-routing.module'
import { TagListComponent } from './tag-list/tag-list.component';
import { TagViewComponent } from './tag-view/tag-view.component';
import { TagFormComponent } from './tag-form/tag-form.component';
import { TagService } from './tag.service';
import { TagInputComponent } from './tag-input/tag-input.component';

@NgModule({
  declarations: [
    TagListComponent,
    TagViewComponent,
    TagFormComponent,
    TagInputComponent
  ],
  imports: [
    CommonModule,
    ScharedModule,
    FormsModule, ReactiveFormsModule,
    TagRoutingModule
  ],
  exports:[TagInputComponent],
  providers: [TagService]
})
export class TagModule { }
