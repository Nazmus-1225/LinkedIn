import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import * as crypto from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAuthenticated:boolean=false;
  email:string="";
  password:string="";
  constructor(private http:HttpClient) { }

  login(){
    const url = "localhost:8080/api/signin/";
    let hash = crypto.SHA256(this.password).toString();
    this.http.post(url,{email:this.email,password:hash})
    .subscribe((response: any) => {
      if (response.message != "Invalid Password!") {
        alert('Sign in successful');
        let token = response.accessToken;
        localStorage.setItem('token', token);

        // this.auth.setAuth(true);
        this.isAuthenticated = true;
        // window.location.reload();
        // this.router.navigate(["home"]);

        const targetUrl = '/'; 
        window.location.href = targetUrl;


      } else {
        alert('Sign in failed.');
      }
    });
  }
}
