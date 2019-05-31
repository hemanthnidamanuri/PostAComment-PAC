import {Injectable, Query} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {Querys} from "../connect/Querys";


@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient, private query: Querys) {
  }

  register(params): Observable<any> {
    return this.query.doPost('register', params).pipe(catchError(error => of([error])));
  }
}
