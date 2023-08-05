import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  temp: string | null='';
  token:string='';
  url:string='http://localhost:8080/api/auth/';
  constructor(private http:HttpClient) { }
  public getToken(): string {  
    this.temp = localStorage.getItem('token');
    if(this.temp!=null){
      this.token=this.temp;
    }
    return this.token;
  }


  check():Observable<any>{
    return this.http.post(this.url,{});
  }
  check1(callback: (isAuthenticated: boolean) => void) {
    this.check().subscribe((data) => {
      const isAuthenticated = (data['isAuthenticated']=='true');
      callback(isAuthenticated);
    });
  }
}
