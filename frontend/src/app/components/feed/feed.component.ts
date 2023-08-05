import { Component } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  postData:any;
  isAuthenticated:boolean=false;
  constructor(private postService:PostService,private auth:AuthService){}
  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
    this.receivePosts();
  }
  receivePosts(): void {  
    this.postService.getPosts()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.postData = res;         
        },
        error: (e) => console.error(e)
      });
  }

}

