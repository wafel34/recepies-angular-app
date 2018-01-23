import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Recipe } from '../shared/recipe.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

    recipes: Recipe[];
    constructor(public api: ApiService,
                private title: Title) {
                    this.title.setTitle('Recipes just right for you!');
                }

    ngOnInit() {
      this.api.get('recipes')
          .subscribe((result) => {
              this.recipes = result;
          });
    }

}
