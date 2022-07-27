/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { UserRoutingModule} from './user-routing.module';
import { ScharedModule } from '../schared/schared.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './user.service';
@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule, UserRoutingModule, ScharedModule, ReactiveFormsModule, FormsModule
  ],
  providers: [UserService]
})
export class UserModule { }
