import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Recepie } from '../shared/recepie.model';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recepie-edit-form',
  templateUrl: './recepie-edit-form.component.html',
  styleUrls: ['./recepie-edit-form.component.sass']
})
export class RecepieEditFormComponent implements OnInit {

    @Input() recepie: Recepie;
    @Output() cancel = new EventEmitter();
    recepiesForm: FormGroup;
    public ingredients: FormArray;
    instructions: FormArray;

    constructor(private formBuilder: FormBuilder,
                private api: ApiService) {
    }

    ngOnInit() {
        this.buildForm();
    }
    buildForm() {
        this.recepiesForm = this.formBuilder.group({
            name: [this.recepie.name, [Validators.required]],
            shortname: [this.recepie.shortName, [Validators.required]],
            headline: [this.recepie.headline, [Validators.required]],
            summary: [this.recepie.summary, [Validators.required]],
            category: [this.recepie.category, [Validators.required]],
            time: [this.recepie.time, [Validators.required]],
            serves: [this.recepie.serves, [Validators.required, Validators.max(20), Validators.min(1)]],
            ingredients: this.formBuilder.array([]),
            instructions: this.formBuilder.array([]),
            photoUrl: [this.recepie.photoUrl, [Validators.required]],
            _id: [this.recepie._id]
        });
        this.initializeArrays('ingredients');
        this.initializeArrays('instructions');
    }

    initializeArrays(arrayName) {
        // set empty array to array of items from RECEPIES array
        this[arrayName] = this.formBuilder.array(this.recepie[arrayName]);
        this[arrayName].controls.map((item) => {
            item.setValidators(Validators.required);
        });
        this.recepiesForm.setControl(arrayName, this[arrayName]);
    }

    addStep(arrayName) {
        // takes an Form array (ingredients or instructions) and it's name and pushes new element
        this[arrayName] = this.recepiesForm.get(arrayName) as FormArray;
        this[arrayName].push(this.formBuilder.control('', Validators.required));
    }

    deleteStep(arrayName, index) {
        // takes an Form array (ingredients or instructions) and it's index and removes the element from this array.
        if (this[arrayName].controls.length !== 1) {
            this[arrayName].removeAt(index);
        } else {
            this[arrayName].controls[0].setValue(null);
        }
    }

    onCancel() {
        this.recepiesForm.reset();
        this.buildForm();
        this.cancel.emit();
    }

    onSubmit() {
        if (this.recepiesForm.valid) {
            this.api.put(`recepies/${this.recepie.shortName}`, this.recepiesForm.value)
                .subscribe((result) => {

                });
        }
    }

}
