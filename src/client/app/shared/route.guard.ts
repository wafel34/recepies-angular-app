import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class RouteGuard implements CanActivate {

    constructor(private auth: AuthenticationService,
                private router: Router) {

    }
    canActivate(): boolean {
        if (!this.auth.isLoggedIn()){
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
}
