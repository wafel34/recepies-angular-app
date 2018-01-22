import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';
import { RecepiePageComponent } from './recepie-page/recepie-page.component';
import { RecepieEditFormComponent } from './recepie-edit-form/recepie-edit-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserRecepiesComponent } from './user-recepies/user-recepies.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RouteGuard } from './shared/route.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent, data: {depth: 1}},
    {path: 'favorites', component: FavoritesComponent, canActivate: [RouteGuard], data: {depth: 1}},
    {path: 'my_recipes', component: UserRecepiesComponent, canActivate: [RouteGuard], data: {depth: 1}},
    {path: 'about', component: AboutComponent, data: {depth: 2}},
    {path: 'add', component: RecepieEditFormComponent, canActivate: [RouteGuard], data: {depth: 2}},
    {path: 'register', component: RegisterComponent, data: {depth: 2}},
    {path: 'login', component: LoginComponent, data: {depth: 2}},
    {path: 'recepies/:shortname', component: RecepiePageComponent, data: {depth: 2}},
    {path: '**', redirectTo: '/home', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
