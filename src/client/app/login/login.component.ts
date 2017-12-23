import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    constructor(private formBuilder: FormBuilder,
                private api: ApiService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            login: ['sample-user', [Validators.required]],
            password: ['sample-password', [Validators.required]]
        });
    }

}
