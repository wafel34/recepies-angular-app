import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required]],
            login: ['', [Validators.required]],
            password: ['', [Validators.required]],
            passwordRepeat: ['', [Validators.required]]
        });
    }

}
