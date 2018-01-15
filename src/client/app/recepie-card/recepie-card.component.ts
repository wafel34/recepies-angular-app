import { Component, OnInit, Input } from '@angular/core';
import { Recepie } from '../shared/recepie.model';
import { AuthenticationService } from '../shared/authentication.service';
import { ApiService } from '../shared/api.service';
import { MatDialog } from '@angular/material';
import { LoginRegisterDialogComponent } from '../login-register-dialog/login-register-dialog.component';

@Component({
  selector: 'app-recepie-card',
  templateUrl: './recepie-card.component.html',
  styleUrls: ['./recepie-card.component.sass']
})
export class RecepieCardComponent implements OnInit {

    @Input() recepie: Recepie;
    isFavorite: boolean;
    username: string;
    constructor(private auth: AuthenticationService,
                public dialog: MatDialog,
                private api: ApiService) { }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            // check if user login is in the 'favoriteFor' section in recepie,
            // which means that user added this recepie to his favorites
            this.username = this.auth.getUserName();
            this.isFavorite = this.recepie.favoriteFor.indexOf(this.username) > -1;
        }
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
