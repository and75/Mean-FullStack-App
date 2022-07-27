import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScharedModule } from '../schared/schared.module';
import { TagModule } from '../tag/tag.module';
import { VocabularyRoutingModule } from './vocabulary-routing.module'
import { VocabularyService } from './vocabulary.service';
import { VocabularyListComponent } from './vocabulary-list/vocabulary-list.component';
import { VocabularyFormComponent } from './vocabulary-form/vocabulary-form.component';
import { VocabularyViewComponent } from './vocabulary-view/vocabulary-view.component';



@NgModule({
  declarations: [
    VocabularyListComponent,
    VocabularyFormComponent,
    VocabularyViewComponent
  ],
  imports: [
    CommonModule, VocabularyRoutingModule,FormsModule, ReactiveFormsModule,ScharedModule,TagModule
  ],
  providers : [VocabularyService]
})
export class VocabularyModule { }
