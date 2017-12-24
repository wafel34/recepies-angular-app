import { Component, OnInit, Input } from '@angular/core';
import { Recepie } from '../shared/recepie.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-recepies-list',
  templateUrl: './recepies-list.component.html',
  styleUrls: ['./recepies-list.component.sass']
})
export class RecepiesListComponent implements OnInit {

    @Input() recepies: Recepie[];
    constructor() {}

    ngOnInit() {

    }

}
