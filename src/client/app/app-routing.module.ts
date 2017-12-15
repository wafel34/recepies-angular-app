import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';
import { RecepiePageComponent } from './recepie-page/recepie-page.component';
import { RecepieEditFormComponent } from './recepie-edit-form/recepie-edit-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'recepies', component: RecepiesListComponent},
    {path: 'home', component: RecepiesListComponent},
    {path: 'add', component: RecepieEditFormComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'recepies/:shortname', component: RecepiePageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
