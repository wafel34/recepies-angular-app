import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
    title = 'app';
    constructor(private auth: AuthenticationService,
                private snackBar: MatSnackBar,
                private router: Router) {
    }

    logout() {
      this.auth.logOut();
      this.snackBar.open('Sucesfully Logged Out.', 'OK', {
        duration: 2500,
      });
      this.router.navigate(['/home']);
    }
}
