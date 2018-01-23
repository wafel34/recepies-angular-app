import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Recipe } from '../shared/recipe.model';
import { AuthenticationService } from '../shared/authentication.service';
import { MatDialog } from '@angular/material';
import { LoginRegisterDialogComponent } from '../login-register-dialog/login-register-dialog.component';
import { trigger, query, style, transition, animate, group} from '@angular/animations';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-page',
  templateUrl: './recipe-page.component.html',
  styleUrls: ['./recipe-page.component.sass'],
  animations: [
      trigger('recipePageAnimation', [
          transition('viewing => editing', [
              style({height: '!'}),
              query('.editHook', style({transform: 'translateX(100%)'})),
              query('.editHook, .viewHook', style({position: 'absolute', top: '0', left: '0', right: '0'})),
              group([
                  query('.viewHook', [animate('.3s ease-out', style({transform: 'translateX(-100%)'}))]),
                  query('.editHook', [animate('.3s ease-out', style({transform: 'translateX(0)'}))])
              ])
          ]), // transitions
          transition('editing => viewing', [
              style({height: '!'}),
              query('.viewHook', style({transform: 'translateX(-100%)'})),
              query('.editHook, #viewHook', style({position: 'absolute', top: '0', left: '0', right: '0'})),
              group([
                  query('.viewHook', [animate('.3s ease-out', style({transform: 'translateX(0)'}))]),
                  query('.editHook', [animate('.3s ease-out', style({transform: 'translateX(100%)'}))])
              ])
          ]), // transitions
          transition('viewing => deleted', [
              style({height: '!'}),
              query('.deleteHook', style({transform: 'translateX(100%)'})),
              query('.deleteHook, .viewHook', style({position: 'absolute', top: '0', left: '0', right: '0'})),
              group([
                  query('.viewHook', [animate('.3s ease-out', style({transform: 'translateX(-100%)'}))]),
                  query('.deleteHook', [animate('.3s ease-out', style({transform: 'translateX(0)'}))])
              ])
          ]) // transitions
      ]) // trigger
  ]

})

export class RecipePageComponent implements OnInit {

    recipe: Recipe;
    routeUrl: string;
    @ViewChild('viewHook') viewHook: ElementRef;
    @ViewChild('editHook') editHook: ElementRef;
    @ViewChild('deleteHook') deleteHook: ElementRef;
    state = 'viewing'; // can take 3 states: viewing(default), editing, deleted
    isFavorite: boolean;
    username: string;
    constructor(route: ActivatedRoute,
                private api: ApiService,
                private auth: AuthenticationService,
                public dialog: MatDialog,
                private title: Title) {
        // get shortname form url
        this.routeUrl = route.snapshot.params.shortname;
    }

    ngOnInit() {
        // get data from database
        this.api.get(`recipes/${this.routeUrl}`)
            .subscribe((result) => {
                this.recipe = result;
                this.title.setTitle(this.recipe.name);
                if (this.auth.isLoggedIn()) {
                    // check if user login is in the 'favoriteFor' section in recipe,
                    // which means that user added this recipe to his favorites
                    this.username = this.auth.getUserName();
                    this.isFavorite = this.recipe.favoriteFor.indexOf(this.username) > -1;
                }
            });


    }

    edit() {
        // function is called when EDIT button is clicked. then page element is hidden and edit element shown.
        this.state = 'editing';
    }

    deleteRecipe() {
        // function is called when DELETE button is clicked.
        const confirmation = confirm('This will permanently delete recipe. Do you still want to continue?');

        if (confirmation) {
            this.api.delete(`recipes/${this.routeUrl}`)
                .subscribe((result) => {
                    this.state = 'deleted';
                });
        }
    }

    cancelEdit(element) {
        // function is called when form component (child) emits a event (which is fired on click of 'Cancel' button in the form)
        this.state = 'viewing';
        window.scrollTo(0, 0);
    }

    updateRecipePage(event) {
        this.recipe = event;
    }

    handleFavorite() {
        if (!this.auth.isLoggedIn()) {
            this.dialog.open(LoginRegisterDialogComponent);
        } else {
            this.isFavorite = !this.isFavorite;
            this.api.put(`recipes/${this.recipe.shortName}/favorites`, {username: this.username})
                .subscribe((result) => {
                    this.recipe = result.result.value;
                });
        }
    }

    // below two methods are mainly responsible for hiding element after animation, so no-one can tab into hidden elemenet
    // because of that we need to also show element befor animation begins to see it animate
    // this is base on states of animation and the component

    animationStart(state) {
        if (state === 'viewing') {
            this.viewHook.nativeElement.classList.remove('hidden');
        }
        if (state === 'editing') {
            this.editHook.nativeElement.classList.remove('hidden');
        }
        if (state === 'deleted') {
            this.deleteHook.nativeElement.classList.remove('hidden');
        }
    }

    animationDone(state) {
        if (state === 'editing') {
            this.viewHook.nativeElement.classList.add('hidden');
        }
        if (state === 'viewing') {
            this.editHook.nativeElement.classList.add('hidden');
            this.deleteHook.nativeElement.classList.add('hidden');
        }
        if (state === 'deleted') {
            this.viewHook.nativeElement.classList.add('hidden');
        }
    }
}
