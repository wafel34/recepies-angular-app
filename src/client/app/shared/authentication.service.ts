import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {

  constructor() { }

  logIn(token) {
      localStorage.setItem('recepies-app-key', token);
  }

  logOut() {
      localStorage.removeItem('recepies-app-key');
  }

  isLoggedIn() {
      return (localStorage.getItem('recepies-app-key') !== null);
  }

}
