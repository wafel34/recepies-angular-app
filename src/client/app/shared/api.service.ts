import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';


@Injectable()
export class ApiService {

    private baseUrl = environment.apiUrl;
    constructor(private http: Http,
                private auth: AuthenticationService) { }

    get(url: string) {
        return this.request(url, RequestMethod.Get);
    }
    post(url: string, body: Object) {
        return this.request(url, RequestMethod.Post, body);
    }
    put(url: string, body: Object) {
        return this.request(url, RequestMethod.Put, body);
    }

    delete(url: string) {
        return this.request(url, RequestMethod.Delete);
    }


    request(url: string, method: RequestMethod, body?: Object) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if (this.auth.isLoggedIn()) {
            const token = this.auth.getToken();
            headers.append('Authorization', 'Bearer ' + token);
        }

        const requestOptions = new RequestOptions({
            url: `${this.baseUrl}/${url}`,
            method: method,
            headers: headers
        });

        if (body) {
          requestOptions.body = body;
        }

        const request = new Request(requestOptions);

        return this.http.request(request)
            .map((res: Response) => res.json());
    }



}
