import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecepiesListComponent } from './recepies-list/recepies-list.component';

const routes: Routes = [
    {path: 'recepies', component: RecepiesListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
