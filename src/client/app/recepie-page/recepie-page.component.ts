import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { Recepie } from '../shared/recepie.model';
import { AuthenticationService } from '../shared/authentication.service';
import { MatDialog } from '@angular/material';
import { LoginRegisterDialogComponent } from '../login-register-dialog/login-register-dialog.component';

@Component({
  selector: 'app-recepie-page',
  templateUrl: './recepie-page.component.html',
  styleUrls: ['./recepie-page.component.sass']
})
export class RecepiePageComponent implements OnInit {

    recepie: Recepie;
    routeUrl: string;
    state = 'viewing'; // can take 3 states: viewing(default), editing, deleted
    isFavorite: boolean;
    username: string;
    constructor(route: ActivatedRoute,
                private api: ApiService,
                private auth: AuthenticationService,
                public dialog: MatDialog) {
        // get shortname form url
        this.routeUrl = route.snapshot.params.shortname;
    }

    ngOnInit() {
        // get data from database
        this.api.get(`recepies/${this.routeUrl}`)
            .subscribe((result) => {
                this.recepie = result;
                if (this.auth.isLoggedIn()) {
                    // check if user login is in the 'favoriteFor' section in recepie,
                    // which means that user added this recepie to his favorites
                    this.username = this.auth.getUserName();
                    this.isFavorite = this.recepie.favoriteFor.indexOf(this.username) > -1;
                }
            });


    }

    edit() {
        // function is called when EDIT button is clicked. then page element is hidden and edit element shown.
        this.state = 'editing';
    }

    deleteRecepie() {
        // function is called when DELETE button is clicked.
        const confirmation = confirm('This will permanently delete recepie. Do you still want to continue?');

        if (confirmation) {
            this.api.delete(`recepies/${this.routeUrl}`)
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

    updateRecepiePage(event) {
        this.recepie = event;
    }

    handleFavorite() {
        if (!this.auth.isLoggedIn()) {
            this.dialog.open(LoginRegisterDialogComponent);
        } else {
            this.isFavorite = !this.isFavorite;
            this.api.put(`recepies/${this.recepie.shortName}/favorites`, {username: this.username})
                .subscribe((result) => {
                    this.recepie = result.result.value;
                });
        }

    }
}
