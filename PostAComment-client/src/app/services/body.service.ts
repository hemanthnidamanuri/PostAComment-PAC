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
  body service will get restapi url from request forlder,
  it get the data from restapi url hitted to back end.
  gettitles(req) will send the data to rest api post
  for saving into database

 */
export class BodyService {


  constructor(private http: HttpClient, private query: Querys) {
  }

  gettitles(params): Observable<any> {
    return this.query.doGet('GET', params).pipe(catchError(error => of([error])));
  }

  getViews(params): Observable<any> {
    return this.query.doGet('GETViews', params).pipe(catchError(error => of([error])));
  }

  postViews(views, id): Observable<any> {
    return this.query.doPatch('UpdateViews', [id, views]).pipe(catchError(error => of([error])));
  }

  searchViews(params, key): Observable<any> {
    console.log('search params are', params);
    return this.query.doGet('searchAll', [params, key]).pipe(catchError(error => of([error])));
  }
}
