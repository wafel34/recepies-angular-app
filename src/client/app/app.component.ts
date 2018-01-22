import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
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
              query(':enter', style({position: 'absolute', top: '0', left: '0', right: '0', zIndex: '2'})),
              group([
                  query(':enter', [animate('.3s ease-out', style({transform: 'translateX(0)'}))])
              ])
          ])
      ])
  ]
})
export class AppComponent {
    increaseScreenHeight: boolean;
    title = 'app';
    constructor(private auth: AuthenticationService,
                private snackBar: MatSnackBar,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    logout() {
      this.auth.logOut();
      this.snackBar.open('Sucesfully Logged Out.', 'OK', {
        duration: 2500,
      });
      this.router.navigate(['/home']);
    }

    getDepth(outlet) {

        /*
        Below if/else statement (apart from return) is responsible for adding extra class to div.parent in app.component.html
        Without this, during transition between depth 2 (recipe component) and depth 1, footrer was appearing on the bottom of the window
        for a fraction of a second.

        Below condition checks if youser is navigating between RecipePageComponent and HomePageComponent and changes this.increaseScreenHeight to true
        this variable then applies class 'parent--full-screen' on element.

        If components are different, class is not applied (this is to properly display lower height components i.e. Login/Register)
        */

        if (this.activatedRoute.children[0]) {
            if (this.activatedRoute.children[0].component.name == 'RecepiePageComponent'
                || this.activatedRoute.children[0].component.name == 'HomePageComponent')
            this.increaseScreenHeight = true;
        } else {
            this.increaseScreenHeight = false;
        }

        return outlet.activatedRouteData.depth;
    }
    startAnimation (event) {
        window.scrollTo(0, 0);
    }

}
