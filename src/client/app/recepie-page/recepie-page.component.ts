import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Recepie } from '../shared/recepie.model';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-recepie-page',
  templateUrl: './recepie-page.component.html',
  styleUrls: ['./recepie-page.component.sass']
})
export class RecepiePageComponent implements OnInit {


    recepie: Recepie;
    routeUrl: string;
    editing: boolean = false;
    constructor(route: ActivatedRoute,
                private api: ApiService) {
        //get shortname form url
        this.routeUrl = route.snapshot.params.shortname;
    }

    ngOnInit() {
        //get data from database
        this.api.get(`recepies/${this.routeUrl}`)
            .subscribe((result) => {
                this.recepie = result;
            });
    }

    edit() {
        this.editing = true;
    }
    finishEditing() {
        this.editing = false;
    }
}
