import { Injectable } from '@angular/core';
import { Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the UserManage provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserManageService {
  authHeaders = new Headers()
  hostURL = "http://host.cloud.anasit.com:8001/parse/"

  constructor(public http: Http) {
    this.authHeaders.append("X-Parse-Application-Id","dev.cloud")
    this.authHeaders.append("X-Parse-Master-Key","angularionic")
    this.authHeaders.append("Content-Type","application/json; charset=utf-8")
  }

  saveClass(className,object){
    let url = this.hostURL+ "classes/"+className
    return this.http.post(url,object,{
      headers:this.authHeaders
    }).toPromise()
  }

  updateClass(className,objectId,object){
    let url = `${this.hostURL}classes/${className}/${objectId}`
    return this.http.put(url,object,{
      headers:this.authHeaders
    }).toPromise()
  }

  deleteClassById(className,objectId){
    let url = `${this.hostURL}classes/${className}/${objectId}`
    return this.http.delete(url,{
      headers:this.authHeaders
    }).toPromise()
  }

  findClasses(className,opts?){
    let url = this.hostURL+ "classes/"+className
    return this.http.get(url,{
      headers:this.authHeaders
    }).toPromise()
  }

  findClassById(className,objectId){
    let url = `${this.hostURL}classes/${className}/${objectId}`
    return this.http.get(url,{
      headers:this.authHeaders
    }).toPromise()
  }

}
