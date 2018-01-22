import { Component, OnInit } from '@angular/core';
import { Recepie } from '../shared/recepie.model';
import { ApiService } from '../shared/api.service';
import { AuthenticationService } from '../shared/authentication.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.sass']
})
export class FavoritesComponent implements OnInit {

    recepies: Recepie[];
    user: string;
    notFound: boolean;
    constructor(private auth: AuthenticationService,
                private api: ApiService,
                private title: Title) {
                    this.user = this.auth.getUserName();
                    this.title.setTitle('Your favorite recipes');
                }

    ngOnInit() {
        this.api.get(`${this.user}/favorites`)
            .subscribe((result) => {
                this.recepies = result;
            }, (error) => {

                if (error.status === 404) {
                    this.notFound = true;
                }
            });
    }

}
