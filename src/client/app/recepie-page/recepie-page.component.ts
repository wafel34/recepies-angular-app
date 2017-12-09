import { Component, OnInit, Input} from '@angular/core';
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
    editing = false;
    constructor(route: ActivatedRoute,
                private api: ApiService) {
        // get shortname form url
        this.routeUrl = route.snapshot.params.shortname;
    }

    ngOnInit() {
        // get data from database
        this.api.get(`recepies/${this.routeUrl}`)
            .subscribe((result) => {
                this.recepie = result;
            });

    }

    edit() {
        // function is called when EDIT button is clicked. then page element is hidden and edit element shown.
        this.editing = true;
    }

    cancelEdit(element) {
        // function is called when form component (child) emits a event (which is fired on click of 'Cancel' button in the form)
        this.editing = false;
        window.scrollTo(0, 0);
    }

    updateRecepiePage(event) {
        this.recepie = event;
    }
}
