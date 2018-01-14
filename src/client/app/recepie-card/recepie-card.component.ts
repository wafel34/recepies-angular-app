import { Component, OnInit, Input } from '@angular/core';
import { Recepie } from '../shared/recepie.model';
import { AuthenticationService } from '../shared/authentication.service';
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
    constructor(private auth: AuthenticationService,
                public dialog: MatDialog) { }

    ngOnInit() {
        if (this.auth.isLoggedIn()) {
            // check if user login is in the 'favoriteFor' section in recepie,
            // which means that user added this recepie to his favorites
            this.isFavorite = this.recepie.favoriteFor.indexOf(this.auth.getUserName()) > -1;
        }
    }

    handleFavorite() {
        if (!this.auth.isLoggedIn()) {
            this.dialog.open(LoginRegisterDialogComponent);
        }
        this.isFavorite = !this.isFavorite;
    }

}
