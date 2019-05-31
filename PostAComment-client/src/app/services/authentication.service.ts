import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Querys} from "../connect/Querys";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private sendDataSubject = new Subject<any>();
  mainToken:any;
  constructor(private http:HttpClient,private query:Querys) { }

  login(value: any):Observable<boolean> {
    return this.query.doPost('auth', value).pipe(map((user:any) => {
      console.log("user token is",user);
      localStorage.setItem('access_token', user);
      return true;
    }))
  }

  logoout(){
    localStorage.removeItem('access_token');
  }
  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  senddata(data: any) {
   this.sendDataSubject.next(data);
  }

  getMessage(): Observable<any>{
    return this.sendDataSubject.asObservable();
  }
}
