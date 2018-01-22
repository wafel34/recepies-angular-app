import { Component, OnInit } from '@angular/core';
import { Recepie } from '../shared/recepie.model';
import { ApiService } from '../shared/api.service';
import { AuthenticationService } from '../shared/authentication.service';
import { Title } from '@angular/platform-browser';

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
                private auth: AuthenticationService,
                private title: Title) {
                    this.user = this.auth.getUserName();
                    this.title.setTitle('Recipes created by you');
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
