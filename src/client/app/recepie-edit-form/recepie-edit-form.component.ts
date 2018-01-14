import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { AuthenticationService } from '../shared/authentication.service';
import { CreateUniqueShortNameService } from '../shared/create-unique-short-name.service';
import { Recepie } from '../shared/recepie.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-recepie-edit-form',
  templateUrl: './recepie-edit-form.component.html',
  styleUrls: ['./recepie-edit-form.component.sass']
})
export class RecepieEditFormComponent implements OnInit {

    @Input() recepie: Recepie;
    @Output() cancel = new EventEmitter();
    @Output() submitted = new EventEmitter();
    recepiesForm: FormGroup;
    addNew = false; // checks if users is editing or adding new recepie
    ingredients: FormArray;
    instructions: FormArray;

    constructor(private formBuilder: FormBuilder,
                private api: ApiService,
                private auth: AuthenticationService,
                private router: Router,
                private shortNameService: CreateUniqueShortNameService,
                private location: Location) {

    }

    ngOnInit() {
        this.addNew = (this.router.url === '/add') ? true : false;
        this.buildForm();
    }

    buildForm() {
        this.recepiesForm = this.formBuilder.group({
            name: [(this.addNew) ? '' : this.recepie.name, [Validators.required]],
            shortname: [(this.addNew) ? '' : this.recepie.shortName],
            headline: [(this.addNew) ? '' : this.recepie.headline, [Validators.required]],
            summary: [(this.addNew) ? '' : this.recepie.summary, [Validators.required]],
            category: [(this.addNew) ? '' : this.recepie.category, [Validators.required]],
            time: [(this.addNew) ? '' : this.recepie.time, [Validators.required]],
            serves: [(this.addNew) ? '' : this.recepie.serves, [Validators.required, Validators.max(20), Validators.min(1)]],
            ingredients: this.formBuilder.array([
                    this.formBuilder.control('', [Validators.required])            ]
            ),
            instructions: this.formBuilder.array([
                this.formBuilder.control('', [Validators.required])
            ]),
            photoUrl: [(this.addNew) ? '' : this.recepie.photoUrl, [Validators.required]],
            _id: [(this.addNew) ? '' : this.recepie._id],
            createdBy: [(this.addNew) ? this.auth.getUserName() : this.recepie.createdBy],
            favoriteFor: [(this.addNew) ? [] : this.recepie.favoriteFor]
        });

        if (!this.addNew) {
            // fill form array with values from Recepie data (do it only if users is editing form, not creating new)
            this.initializeArrays('ingredients');
            this.initializeArrays('instructions');
        }

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
        if (this.addNew) {
            this.location.back();
        } else {
            this.cancel.emit();
        }
    }

    onSubmit() {
        if (this.recepiesForm.valid) {

            if (this.addNew) {
                // submition when new recepie is added
                this.onAddSubmit();
            } else {
                // submition when existing recepie is edited
                this.onEditSubmit();
            }
        }
    }

    onAddSubmit() {
        // handling form submition when new recepie is added
        const uniqueShortname = this.shortNameService.createUniqueName(this.recepiesForm.value.name);
        this.recepiesForm.get('shortname').setValue(uniqueShortname);
        this.api.post(`recepies`, this.recepiesForm.value)
            .subscribe((result) => {
                this.router.navigate(['/recepies', uniqueShortname]);
            });
    }

    onEditSubmit() {
        // handling form submition when existing recepie is edited
        if (this.recepiesForm.value.name !== this.recepie.name) {
            // if name has been changed, generate new unique shortName for routing
            const uniqueShortname = this.shortNameService.createUniqueName(this.recepiesForm.value.name);
            this.recepiesForm.get('shortname').setValue(uniqueShortname);
        }

        this.api.put(`recepies/${this.recepie.shortName}`, this.recepiesForm.value)
            .subscribe((result) => {
                this.recepie = result.value;
                this.emitSubmit();
                this.router.navigate(['/recepies', this.recepie.shortName]);
            });
    }


    emitSubmit() {
        this.cancel.emit();
        this.submitted.emit(this.recepie);
    }

}
