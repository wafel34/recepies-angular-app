import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { AuthenticationService } from '../shared/authentication.service';
import { ApiService } from '../shared/api.service';
import { MatDialog } from '@angular/material';
import { LoginRegisterDialogComponent } from '../login-register-dialog/login-register-dialog.component';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.sass']
})
export class RecipeCardComponent implements OnInit {

    @Input() recipe: Recipe;
    @Output() removeFavorite = new EventEmitter();
    isFavorite: boolean;
    username: string;
    constructor(private auth: AuthenticationService,
                public dialog: MatDialog,
                private api: ApiService) { }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            // check if user login is in the 'favoriteFor' section in recipe,
            // which means that user added this recipe to his favorites
            this.username = this.auth.getUserName();
            this.isFavorite = this.recipe.favoriteFor.indexOf(this.username) > -1;
        }
    }

    handleFavorite() {
        if (!this.auth.isLoggedIn()) {
            this.dialog.open(LoginRegisterDialogComponent);
        } else {
            this.isFavorite = !this.isFavorite;
            this.api.put(`recipes/${this.recipe.shortName}/favorites`, {username: this.username})
                .subscribe((result) => {
                    this.recipe = result.result.value;

                    if (this.isFavorite === false) {
                        this.removeFavorite.emit(this.recipe);
                    }
                });
        }

    }

}
