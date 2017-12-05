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
    ingredients: FormArray;
    instructions: FormArray;

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
            instructions: this.formBuilder.array([]),
            photoUrl: [this.recepie.photoUrl]
        });

        this.initializeArrays();
    }


    initializeArrays() {
        // set ingredients array of ingredients from recepies
        this.ingredients = this.formBuilder.array(this.recepie.ingredients);
        this.recepiesForm.setControl('ingredients', this.ingredients);
        this.instructions = this.formBuilder.array(this.recepie.instructions);
        this.recepiesForm.setControl('instructions', this.instructions);
    }

    addStep(array, arrayName) {
        // takes an Form array (ingredients or instructions) and it's name and pushes new element
        array = this.recepiesForm.get(arrayName) as FormArray;
        array.push(this.formBuilder.control(''));
    }

    deleteStep(array, index) {
        // takes an Form array (ingredients or instructions) and it's index and removes the element from this array.
        if (array.controls.length !== 1) {
            array.removeAt(index);
        } else {
            array.controls[0].setValue(null);
        }
    }

    onSubmit() {
        console.log(this.recepiesForm);
    }


}
