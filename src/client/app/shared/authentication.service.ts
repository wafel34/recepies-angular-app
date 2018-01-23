import { Injectable, Output } from '@angular/core';

@Injectable()
export class AuthenticationService {

    @Output() username: string;
    constructor() { }

    logIn(userInfo) {
      localStorage.setItem('recipes-app-key', userInfo.token);
      localStorage.setItem('recipes-app-login', userInfo.username);
    }

    logOut() {
      localStorage.removeItem('recipes-app-key');
      localStorage.removeItem('recipes-app-login');
    }
    getUserName () {
        return localStorage.getItem('recipes-app-login');
    }

    getToken() {
        return (localStorage.getItem('recipes-app-key') !== null) ? localStorage.getItem('recipes-app-key') : null;
    }

    isLoggedIn() {
      return (localStorage.getItem('recipes-app-key') !== null);
    }

}
