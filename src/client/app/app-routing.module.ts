import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';
import { RecepiePageComponent } from './recepie-page/recepie-page.component';

const routes: Routes = [
    {path: 'recepies', component: RecepiesListComponent},
    {path: 'recepies/:shortname', component: RecepiePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
