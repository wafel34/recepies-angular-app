import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    errorMsg: object;
    constructor(private formBuilder: FormBuilder,
                private api: ApiService,
                private auth: AuthenticationService,
                private snackBar: MatSnackBar,
                private router: Router) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['sample-user', [Validators.required]],
            password: ['sample-password', [Validators.required]]
        });
    }

    onSubmit() {
        const loginDetails = this.loginForm.value;
        this.api.post('authenticate', loginDetails)
            .subscribe((result) => {
                this.auth.logIn(result.token);
                this.snackBar.open('Sucesfully Logged In.', 'OK', {
                  duration: 2500,
                });
                this.router.navigate(['/home']);

                if (this.errorMsg) {
                    this.errorMsg = null;
                }
            }, (error) => {
                this.errorMsg = JSON.parse(error._body);
            });
    }

}
