import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Linkedin';
  isAuthenticated: boolean=false;
  constructor(private auth:AuthService){}
  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated=true;
      } else {
        this.isAuthenticated=false;
      }
    });

  }
  logout(){
    localStorage.removeItem('token');
    this.isAuthenticated=false;
    const targetUrl = 'home'; 
    window.location.href = targetUrl;
  }
}
