import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipePageComponent } from './recipe-page/recipe-page.component';
import { RecipeEditFormComponent } from './recipe-edit-form/recipe-edit-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RouteGuard } from './shared/route.guard';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomePageComponent, data: {depth: 1, name: 'Home'}},
    {path: 'favorites', component: FavoritesComponent, canActivate: [RouteGuard], data: {depth: 1, name: 'Favorites'}},
    {path: 'my_recipes', component: UserRecipesComponent, canActivate: [RouteGuard], data: {depth: 1, name: 'UserRecipes'}},
    {path: 'about', component: AboutComponent, data: {depth: 2, name: 'About'}},
    {path: 'add', component: RecipeEditFormComponent, canActivate: [RouteGuard], data: {depth: 2, name: 'Add'}},
    {path: 'register', component: RegisterComponent, data: {depth: 2, name: 'Register'}},
    {path: 'login', component: LoginComponent, data: {depth: 2, name: 'Login'}},
    {path: 'recipes/:shortname', component: RecipePageComponent, data: {depth: 2, name: 'RecipePage'}},
    {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
