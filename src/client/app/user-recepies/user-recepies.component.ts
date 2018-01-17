import { Component, OnInit } from '@angular/core';
import { Recepie } from '../shared/recepie.model';
import { ApiService } from '../shared/api.service';
import { AuthenticationService } from '../shared/authentication.service';

@Component({
  selector: 'app-user-recepies',
  templateUrl: './user-recepies.component.html',
  styleUrls: ['./user-recepies.component.sass']
})
export class UserRecepiesComponent implements OnInit {

    recepies: Recepie[];
    user: string;
    notFound: boolean;
    constructor(private api: ApiService,
                private auth: AuthenticationService) {
                    this.user = this.auth.getUserName();
                }

    ngOnInit() {
        this.api.get(`${this.user}/recepies`)
            .subscribe((result) => {
                this.recepies = result;
            }, (error) => {
                if (error.status === 404) {
                    this.notFound = true;
                }
            });
    }

}
