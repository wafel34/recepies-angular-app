import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.sass']
})
export class RecipesListComponent implements OnInit {

    @Input() recipes: Recipe[];
    constructor(private router: ActivatedRoute) {}

    ngOnInit() {

    }

    removeFromFavoritesList(recipe) {

        // this method will remove recipe on fly form favorites list if user is unselecting recipe fom 'favorites'
        // in 'favorites' section
        if (this.router.snapshot.routeConfig.path === 'favorites') {
            this.recipes = this.recipes.filter((item) => {
                return item.shortName !== recipe.shortName;
            });
        }
    }
}
