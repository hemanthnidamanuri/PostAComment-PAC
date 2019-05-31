import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Querys} from "../connect/Querys";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";

@Injectable({
  providedIn: 'root'
})

/*
    WritepostService will get restapi call or url from query and send data params
    along with to backend for saving post data.
 */

export class WritepostService {

  constructor(private http: HttpClient, private query: Querys) {
  }

  insertpost(params): Observable<any> {
    return this.query.doPost('posting', params).pipe(catchError(error => of([error])));
  }
}
