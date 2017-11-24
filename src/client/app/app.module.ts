import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
// material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatGridListModule
} from '@angular/material';
// components
import { AppComponent } from './app.component';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';
import { RecepieCardComponent } from './recepie-card/recepie-card.component';

// services
import { ApiService } from './shared/api.service';


import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    RecepiesListComponent,
    RecepieCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
