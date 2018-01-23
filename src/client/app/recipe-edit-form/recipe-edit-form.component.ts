import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { AuthenticationService } from '../shared/authentication.service';
import { CreateUniqueShortNameService } from '../shared/create-unique-short-name.service';
import { Recipe } from '../shared/recipe.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-recipe-edit-form',
  templateUrl: './recipe-edit-form.component.html',
  styleUrls: ['./recipe-edit-form.component.sass']
})
export class RecipeEditFormComponent implements OnInit {

    @Input() recipe: Recipe;
    @Output() cancel = new EventEmitter();
    @Output() submitted = new EventEmitter();
    recipesForm: FormGroup;
    addNew = false; // checks if users is editing or adding new recipe
    ingredients: FormArray;
    instructions: FormArray;

    constructor(private formBuilder: FormBuilder,
                private api: ApiService,
                private auth: AuthenticationService,
                private router: Router,
                private shortNameService: CreateUniqueShortNameService,
                private location: Location,
                private title: Title) {

    }

    ngOnInit() {
        this.addNew = (this.router.url === '/add') ? true : false;
        if (this.addNew) {
            this.title.setTitle('Add a new recipe');
        }
        this.buildForm();
    }

    buildForm() {
        this.recipesForm = this.formBuilder.group({
            name: [(this.addNew) ? '' : this.recipe.name, [Validators.required]],
            shortname: [(this.addNew) ? '' : this.recipe.shortName],
            headline: [(this.addNew) ? '' : this.recipe.headline, [Validators.required]],
            summary: [(this.addNew) ? '' : this.recipe.summary, [Validators.required]],
            category: [(this.addNew) ? '' : this.recipe.category, [Validators.required]],
            time: [(this.addNew) ? '' : this.recipe.time, [Validators.required]],
            serves: [(this.addNew) ? '' : this.recipe.serves, [Validators.required, Validators.max(20), Validators.min(1)]],
            ingredients: this.formBuilder.array([
                    this.formBuilder.control('', [Validators.required])            ]
            ),
            instructions: this.formBuilder.array([
                this.formBuilder.control('', [Validators.required])
            ]),
            photoUrl: [(this.addNew) ? '' : this.recipe.photoUrl, [Validators.required]],
            _id: [(this.addNew) ? '' : this.recipe._id],
            createdBy: [(this.addNew) ? this.auth.getUserName() : this.recipe.createdBy],
            favoriteFor: [(this.addNew) ? [] : this.recipe.favoriteFor]
        });

        if (!this.addNew) {
            // fill form array with values from Recipe data (do it only if users is editing form, not creating new)
            this.initializeArrays('ingredients');
            this.initializeArrays('instructions');
        }

    }

    initializeArrays(arrayName) {
        // set empty array to array of items from RECEPIES array
        this[arrayName] = this.formBuilder.array(this.recipe[arrayName]);
        this[arrayName].controls.map((item) => {
            item.setValidators(Validators.required);
        });
        this.recipesForm.setControl(arrayName, this[arrayName]);
    }

    addStep(arrayName) {
        // takes an Form array (ingredients or instructions) and it's name and pushes new element
        this[arrayName] = this.recipesForm.get(arrayName) as FormArray;
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
        this.recipesForm.reset();
        this.buildForm();
        if (this.addNew) {
            this.location.back();
        } else {
            this.cancel.emit();
        }
    }

    onSubmit() {
        if (this.recipesForm.valid) {

            if (this.addNew) {
                // submition when new recipe is added
                this.onAddSubmit();
            } else {
                // submition when existing recipe is edited
                this.onEditSubmit();
            }
        }
    }

    onAddSubmit() {
        // handling form submition when new recipe is added
        const uniqueShortname = this.shortNameService.createUniqueName(this.recipesForm.value.name);
        this.recipesForm.get('shortname').setValue(uniqueShortname);
        this.api.post(`recipes`, this.recipesForm.value)
            .subscribe((result) => {
                this.router.navigate(['/recipes', uniqueShortname]);
            });
    }

    onEditSubmit() {
        // handling form submition when existing recipe is edited
        if (this.recipesForm.value.name !== this.recipe.name) {
            // if name has been changed, generate new unique shortName for routing
            const uniqueShortname = this.shortNameService.createUniqueName(this.recipesForm.value.name);
            this.recipesForm.get('shortname').setValue(uniqueShortname);
        }

        this.api.put(`recipes/${this.recipe.shortName}`, this.recipesForm.value)
            .subscribe((result) => {
                this.recipe = result.value;
                this.emitSubmit();
                this.router.navigate(['/recipes', this.recipe.shortName]);
            });
    }


    emitSubmit() {
        this.cancel.emit();
        this.submitted.emit(this.recipe);
    }

}
