import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import * as crypto from 'crypto-js';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(email: string,password: string){
    const url = "http://localhost:8080/api/signin/";
    let hash = crypto.SHA256(password).toString();
    this.http.post(url,{email:email,password:hash})
    .subscribe((response: any) => {
      if (response.message != "Invalid Password!") {
        alert('Sign in successful');
        let token = response.accessToken;
        localStorage.setItem('token', token);
        const targetUrl = '/'; 
        window.location.href = targetUrl;
      } else {
        alert('Sign in failed.');
      }
    });
  }

  signup(email: string,password: string,username:string){
    const url = "http://localhost:8080/api/signup/";
    let hash = crypto.SHA256(password).toString();
    this.http.post(url,{email:email,password:hash,username:username})
    .subscribe((response: any) => {alert(response.message);});
  }
  
  profile():Observable<any>{
    const url = "http://localhost:8080/api/profile/";
    return this.http.post<any>(url,{})};
  }

