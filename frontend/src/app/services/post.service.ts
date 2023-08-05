import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient,private auth:AuthService) { }
  getPosts():Observable<any>{
    const url = "http://localhost:8080/api/posts/";
    return this.http.post<any>(url,{})};

  getNotifications():Observable<any>{
    const url = "http://localhost:8080/api/notifications/";
    return this.http.post<any>(url,{})};

  addPost(formData:FormData):Observable<any>{
    const url = "http://localhost:8080/api/post/";
    let token=this.auth.getToken();
    formData.append('token',token);
    console.log(formData);
    return this.http.post<any>(url,formData)};
}
