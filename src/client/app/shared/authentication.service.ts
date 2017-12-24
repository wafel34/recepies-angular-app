import { Injectable, Output } from '@angular/core';

@Injectable()
export class AuthenticationService {

    @Output() username: string;
    constructor() { }

    logIn(userInfo) {
      localStorage.setItem('recepies-app-key', userInfo.token);
      localStorage.setItem('recepies-app-login', userInfo.username);
    }

    logOut() {
      localStorage.removeItem('recepies-app-key');
      localStorage.removeItem('recepies-app-login');
    }
    getUserName () {
        return localStorage.getItem('recepies-app-login');
    }

    getToken() {
        return (localStorage.getItem('recepies-app-key') !== null) ? localStorage.getItem('recepies-app-key') : null;
    }

    isLoggedIn() {
      return (localStorage.getItem('recepies-app-key') !== null);
    }

}
