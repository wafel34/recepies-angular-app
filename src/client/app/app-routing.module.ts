import { NgModule } from '@angular/core';
import { Routes, RouterModule,CanActivate } from '@angular/router';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';
import { RecepiePageComponent } from './recepie-page/recepie-page.component';
import { RecepieEditFormComponent } from './recepie-edit-form/recepie-edit-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserRecepiesComponent } from './user-recepies/user-recepies.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RouteGuard } from './shared/route.guard';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent},
    {path: 'favorites', component: FavoritesComponent, canActivate: [RouteGuard]},
    {path: 'my_recepies', component: UserRecepiesComponent, canActivate: [RouteGuard]},
    {path: 'add', component: RecepieEditFormComponent, canActivate: [RouteGuard]},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'recepies/:shortname', component: RecepiePageComponent},
    {path: '**', redirectTo: '/home', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
