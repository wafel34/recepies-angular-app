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
  MatSelectModule,
  MatTabsModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatDialogModule
} from '@angular/material';
// components
import { AppComponent } from './app.component';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';
import { RecepieCardComponent } from './recepie-card/recepie-card.component';
import { RecepiePageComponent } from './recepie-page/recepie-page.component';
import { RecepieEditFormComponent } from './recepie-edit-form/recepie-edit-form.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserRecepiesComponent } from './user-recepies/user-recepies.component';
import { LoginRegisterDialogComponent } from './login-register-dialog/login-register-dialog.component';
import { AboutComponent } from './about/about.component';

// services
import { ApiService } from './shared/api.service';
import { CreateUniqueShortNameService } from './shared/create-unique-short-name.service';
import { AuthenticationService } from './shared/authentication.service';
import { RouteGuard } from './shared/route.guard';


import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    RecepiesListComponent,
    RecepieCardComponent,
    RecepiePageComponent,
    RecepieEditFormComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    FavoritesComponent,
    HomePageComponent,
    UserRecepiesComponent,
    LoginRegisterDialogComponent,
    AboutComponent
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
    MatSelectModule,
    MatTabsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [
      ApiService,
      CreateUniqueShortNameService,
      AuthenticationService,
      RouteGuard
    ],
  bootstrap: [AppComponent],

  entryComponents: [LoginRegisterDialogComponent],
})
export class AppModule { }
