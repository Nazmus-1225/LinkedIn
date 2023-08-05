import { Post } from "./post.model";

export class User {
    username: string;
    email: string;
    posts: Post[];

    constructor(username: string, email: string) {
      this.username = username;
      this.email = email;
      this.posts=[];
    }
  }
  
