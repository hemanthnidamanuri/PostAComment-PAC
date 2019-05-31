import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Querys} from "../connect/Querys";
import {catchError} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";

@Injectable({
  providedIn: 'root'
})

/*
    Viewpostservice will conduct all restapi calls or urls fro  request folder send to http
    get and access the data for viewpost component.
 */

export class ViewpostService {

  constructor(private http:HttpClient,private query:Querys) { }

  private likesAll = new Subject<any>();

  likesAllObservble = this.likesAll.asObservable();

  public setlikesAll(type: any){

      this.likesAll.next(type);
  }

  getByIdAll(id):Observable<any>{
    return this.query.doGet('GETById',id).pipe( catchError(err => of([err])));
  }

  submitcomment(params):Observable<any>{
    return this.query.doPost('sumittingcomment',params)
      .pipe(catchError(err => of([err])));
  }

  getAllComments(params):Observable<any>{
    return this.query.doGet('GETComments',params).pipe( catchError(err => of([err])));
  }

  submitlikes(id):Observable<any>{
    return this.query.doPost('POSTLikes',{id}).pipe(catchError(err => of([err])));
  }

  getAllLikes(params):Observable<any>{
    return this.query.doGet('GETAllLikes', params).pipe( catchError(err => of([err])));
  }
}
