import { Component, OnInit, Input } from '@angular/core';
import { Recepie } from '../shared/recepie.model';
@Component({
  selector: 'app-recepie-card',
  templateUrl: './recepie-card.component.html',
  styleUrls: ['./recepie-card.component.sass']
})
export class RecepieCardComponent implements OnInit {

    @Input() recepie: Recepie;
    constructor() { }

    ngOnInit() {
    }

}
