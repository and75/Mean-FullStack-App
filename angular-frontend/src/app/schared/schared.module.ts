import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatBadgeModule} from '@angular/material/badge';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { CustomValidators } from './../_providers/CustomValidators';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FileUploadComponent } from './file-upload/file-upload.component'
import { SharedService } from './shared.service';
import { FileViewerComponent } from './file-viewer/file-viewer.component';
import { CommentViewComponent } from './comment-view/comment-view.component';
import { ActivityViewComponent } from './activity-view/activity-view.component';
import { TagInputComponent } from './tag-input/tag-input.component';
import { AuthorInputComponent } from './author-input/author-input.component';
import { BookmarkInputComponent } from './bookmark-input/bookmark-input.component';
import { OwnerBlockComponent } from './owner-block/owner-block.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    SidemenuComponent,
    ConfirmDialogComponent,
    FileUploadComponent,
    FileViewerComponent,
    CommentViewComponent,
    ActivityViewComponent,
    TagInputComponent,
    AuthorInputComponent,
    BookmarkInputComponent,
    OwnerBlockComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatListModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatBadgeModule,
    RouterModule
  ],
  exports: [
    ToolbarComponent,
    SidemenuComponent,
    ConfirmDialogComponent,
    FileUploadComponent,
    FileViewerComponent,
    TagInputComponent,
    AuthorInputComponent,
    BookmarkInputComponent,
    CommentViewComponent,
    ActivityViewComponent,
    OwnerBlockComponent,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatChipsModule,
    MatTabsModule,
    MatListModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatBadgeModule

  ],
  providers: [CustomValidators, SharedService]
})
export class ScharedModule { }
