import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileData:any;
  isAuthenticated:boolean=false;
  textInput: string = '';
  hasImage=0;
  selectedFile: File|any;
  constructor(private userService:UserService,private postService:PostService,private auth:AuthService){}
  ngOnInit(): void {
    this.auth.check1((isAuthenticated) => {
      if (isAuthenticated) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });
    this.receiveProfile();
  }
  receiveProfile(): void {  
    this.userService.profile()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.profileData = res;         
        },
        error: (e) => console.error(e)
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(): void {
    if (this.selectedFile) {
      this.hasImage=1;
    }

    const formData = new FormData();
    formData.append('text', this.textInput);
    formData.append('file', this.selectedFile,this.selectedFile.name);
    formData.append('hasImage',this.hasImage.toString());

    this.postService.addPost( formData).subscribe(
      (response) => {
        console.log('Upload successful!', response);
        // Handle the response from the backend if needed.
      },
      (error) => {
        console.error('Error uploading:', error);
        // Handle the error if needed.
      }
    );

    }
  }
