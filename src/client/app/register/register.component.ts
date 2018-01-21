import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { trigger, query, style, transition, animate, group} from '@angular/animations';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  animations: [
      trigger('registerAnimation', [
          transition('form => registered', [
              style({height: '!'}),
              query('.registerHook', style({transform: 'translateX(100%)'})),
              query('.formHook, .registerHook', style({position: 'absolute', top: '0', left: '0', right: '0'})),
              group([
                  query('.formHook', [animate('.3s ease-out', style({transform: 'translateX(-100%)'}))]),
                  query('.registerHook', [animate('.3s ease-out', style({transform: 'translateX(0)'}))])
              ])
          ]) // transitions
      ]) // trigger
  ]
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    formErrorMsg = '';
    @ViewChild('formHook') formHook: ElementRef;
    @ViewChild('registerHook') registerHook: ElementRef;
    state = 'form'; // can take 2 states: form(default), registered
    constructor(private formBuilder: FormBuilder,
                private api: ApiService,
                private title: Title) {
                    this.title.setTitle('Register to application');
                }

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern( /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i)]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            passwordRepeat: ['', [Validators.required]]
        });
    }
    onSubmit() {
        if (this.registerForm.valid) {
            if (this.registerForm.value.password !== this.registerForm.value.passwordRepeat) {
                this.formErrorMsg = `Passwords don't match.`;
                return false;
            }

            if (this.formErrorMsg !== '') {
                this.formErrorMsg = '';
            }

            this.api.post('register', this.registerForm.value)
                .subscribe( (result) => {
                        this.state = 'registered';
                }, (err) => {
                    let tempErr = err._body;
                    tempErr = JSON.parse(tempErr);
                    this.formErrorMsg = tempErr.error;
                });
        } // endIF registerForm.valid
    }


    animationStart(state) {
        if (state === 'form') {
            this.formHook.nativeElement.classList.remove('hidden');
        }
        if (state === 'registered') {
            this.registerHook.nativeElement.classList.remove('hidden');
        }
    }

    animationDone(state) {
        if (state === 'registered') {
            this.formHook.nativeElement.classList.add('hidden');
        }
        if (state === 'form') {
            this.registerHook.nativeElement.classList.add('hidden');
        }
    }



}
