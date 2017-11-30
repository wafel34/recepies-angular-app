import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Recepie } from '../shared/recepie.model';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-recepie-edit-form',
  templateUrl: './recepie-edit-form.component.html',
  styleUrls: ['./recepie-edit-form.component.sass']
})
export class RecepieEditFormComponent implements OnInit {

    @Input() recepie: Recepie;
    recepiesForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.recepiesForm = this.formBuilder.group({
            name: [this.recepie.name],
            shortname: [this.recepie.shortName],
            headline: [this.recepie.headline],
            summary: [this.recepie.summary],
            category: [this.recepie.category],
            time: [this.recepie.time],
            serves: [this.recepie.serves],
            ingredients: [this.recepie.ingredients],
            instructions: [this.recepie.instructions],
            photoUrl: [this.recepie.photoUrl]
        });
    }

}
