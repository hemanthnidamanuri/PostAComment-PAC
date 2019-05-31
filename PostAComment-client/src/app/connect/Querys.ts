
/*
      Querys have injectible which these http methods will accsssed from service calls
      return restapi http methd with url [clienttobackend] with option params and headers
 */

import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {Endpoints} from "./ClienttoBackend";

@Injectable()
export  class Querys {

  constructor(private http:HttpClient) {}

  // GET
  doGet(url: string, params: any) {
    url = Endpoints(url,params);
    return this.http.get(url, {params: params});
  }

  // POST
  doPost(url: string, params: any, headers?: any) {
    url = Endpoints(url,params);
    return this.http.post(url, params, headers);
  }

  // DELETE
  doDelete(url: string, params: any) {
    url = Endpoints(url,params);
    return this.http.delete(url, params);
  }

  // PUT
  doPut(url: string, params: any, headers?: any) {
    url = Endpoints(url,params);
    return this.http.put(url, params, headers);
  }

  //PATCH
  doPatch(url: string, params: any, headers?: any) {
    url = Endpoints(url,params);
    return this.http.patch(url, params, headers);
  }

}
