import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriveService } from './drive.service';
import { DriveRoutingModule} from './drive-routing.module';
import { ScharedModule } from '../schared/schared.module';
import { DriveListComponent } from './drive-list/drive-list.component';
import { DriveViewComponent } from './drive-view/drive-view.component';
import { DriveFormComponent } from './drive-form/drive-form.component';

@NgModule({
  declarations: [
    DriveListComponent,
    DriveViewComponent,
    DriveFormComponent
  ],
  imports: [
    CommonModule,DriveRoutingModule,ScharedModule
  ],
  providers:[DriveService]
})
export class DriveModule { }
