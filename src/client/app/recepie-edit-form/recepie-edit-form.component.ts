import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Recepie } from '../shared/recepie.model';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-recepie-edit-form',
  templateUrl: './recepie-edit-form.component.html',
  styleUrls: ['./recepie-edit-form.component.sass']
})
export class RecepieEditFormComponent implements OnInit {

    @Input() recepie: Recepie;
    recepiesForm: FormGroup;
    ingredients: any[] = [];

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
            ingredients: this.formBuilder.array([]),
            instructions: [this.recepie.instructions],
            photoUrl: [this.recepie.photoUrl]
        });

        this.initializeIngridients();
    }


    initializeIngridients() {
        this.ingredients = this.formBuilder.array(this.recepie.ingredients);
        this.recepiesForm.setControl('ingredients', this.ingredients);
    }

    addIngredient() {
        this.ingredients = this.recepiesForm.get('ingredients');
        this.ingredients.push(this.formBuilder.control(''));
    }

    onSubmit() {
        console.log('dyao', this.recepiesForm);
    }




}
