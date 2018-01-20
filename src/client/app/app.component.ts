import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { trigger, query, style, transition, animate, group} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
      trigger('routeAnimtion', [
          transition('1=>2', [
              style({height: '!'}),
              query(':enter', style({transform: 'translateX(100%)'})),
              query(':enter', style({position: 'absolute', top: '0', left: '0', right: '0'})),
              group([
                  query(':enter', [animate('.3s ease-out', style({transform: 'translateX(0)'}))])
              ])
          ]), // transition
          transition('2=>1', [
              style({height: '!'}),
              query(':enter', style({transform: 'translateX(-100%)'})),
              query(':enter', style({position: 'absolute', top: '0', left: '0', right: '0'})),
              group([
                  query(':enter', [animate('.3s ease-out', style({transform: 'translateX(0)'}))])
              ])
          ])
      ])
  ]
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

    getDepth(outlet) {
        return outlet.activatedRouteData.depth;
    }
    startAnimation (event) {
        window.scrollTo(0, 0);
    }

}
