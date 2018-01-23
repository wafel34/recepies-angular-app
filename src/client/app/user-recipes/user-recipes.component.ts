import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { ApiService } from '../shared/api.service';
import { AuthenticationService } from '../shared/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.sass']
})
export class UserRecipesComponent implements OnInit {

    recipes: Recipe[];
    user: string;
    notFound: boolean;
    constructor(private api: ApiService,
                private auth: AuthenticationService,
                private title: Title) {
                    this.user = this.auth.getUserName();
                    this.title.setTitle('Recipes created by you');
                }

    ngOnInit() {
        this.api.get(`${this.user}/recipes`)
            .subscribe((result) => {
                if (result === null) {
                    this.notFound = true;
                } else {
                    this.recipes = result;
                }
            }, (error) => {
                    this.notFound = true;
            });
    }

}
