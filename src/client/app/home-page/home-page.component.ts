import { Component, OnInit } from '@angular/core';
import { Recepie } from '../shared/recepie.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

    recepies: Recepie[];
    constructor(public api: ApiService) { }

    ngOnInit() {
      this.api.get('recepies')
          .subscribe((result) => {
              this.recepies = result;
          });
    }

}
