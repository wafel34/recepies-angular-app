import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'app';
  constructor(private auth: AuthenticationService) {

  }
}
