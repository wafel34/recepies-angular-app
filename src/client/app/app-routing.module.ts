import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';
import { RecepiePageComponent } from './recepie-page/recepie-page.component';
import { RecepieEditFormComponent } from './recepie-edit-form/recepie-edit-form.component';

const routes: Routes = [
    {path: 'recepies', component: RecepiesListComponent},
    {path: 'home', component: RecepiesListComponent},
    {path: 'add', component: RecepieEditFormComponent},
    {path: 'recepies/:shortname', component: RecepiePageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
