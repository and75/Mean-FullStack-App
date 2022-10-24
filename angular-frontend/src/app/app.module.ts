import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule } from './alerts/alert.module';
import { ScharedModule } from './schared/schared.module';
import { DaschboardModule } from './daschboard/daschboard.module';
import { TagModule } from './tag/tag.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { StatisticModule } from './statistic/statistic.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataService } from './data.service';
import { LocalStorageService} from './local-storage.service';
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { DriveModule } from './drive/drive.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScharedModule,
    AlertModule,
    AuthenticationModule,
    TagModule,
    BookmarkModule,
    AuthorModule,
    BookModule,
    VocabularyModule,
    DriveModule,
    StatisticModule,
    DaschboardModule,
    UserModule,
    AppRoutingModule,
  ],
  providers: [AuthGuardService,AuthService,AppService,LocalStorageService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
