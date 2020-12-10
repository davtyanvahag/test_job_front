import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FilesService} from './services/files.service';
import {UsersService} from './services/users.service';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ValidationsService} from './services/validation.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [
    HttpClientModule,
    FilesService,
    ValidationsService,
    UsersService
  ],
  bootstrap: [AppComponent],
  exports: [HttpClientModule]
})
export class AppModule { }
