// models/post.model.ts

export class Post {
    text: string;
    hasImage: boolean;
    imagePath: string;
    datePosted: Date;
    postGiverEmail: string;
  
    // Constructor to initialize properties
    constructor(
      text: string,
      hasImage: boolean,
      imagePath: string,
      datePosted: Date,
      postGiverEmail: string
    ) {
      this.text = text;
      this.hasImage = hasImage;
      this.imagePath = imagePath;
      this.datePosted = datePosted;
      this.postGiverEmail = postGiverEmail;
    }
  }
  