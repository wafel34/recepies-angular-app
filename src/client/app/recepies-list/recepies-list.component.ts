import { Component, OnInit, Input } from '@angular/core';
import { Recepie } from '../shared/recepie.model';
import { ApiService } from '../shared/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recepies-list',
  templateUrl: './recepies-list.component.html',
  styleUrls: ['./recepies-list.component.sass']
})
export class RecepiesListComponent implements OnInit {

    @Input() recepies: Recepie[];
    constructor(private router: ActivatedRoute) {}

    ngOnInit() {

    }

    removeFromFavoritesList(recepie) {

        /*if (this.router.url._value[0].path === 'favorites'){
            this.recepies = this.recepies.filter((item) => {
                return item.shortName !== recepie.shortName;
            });

        }*/
    }

}
