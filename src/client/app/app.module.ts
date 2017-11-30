import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
// material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatGridListModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
// components
import { AppComponent } from './app.component';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';
import { RecepieCardComponent } from './recepie-card/recepie-card.component';
import { RecepiePageComponent } from './recepie-page/recepie-page.component';
import { RecepieEditFormComponent } from './recepie-edit-form/recepie-edit-form.component';

// services
import { ApiService } from './shared/api.service';


import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    RecepiesListComponent,
    RecepieCardComponent,
    RecepiePageComponent,
    RecepieEditFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatSidenavModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
