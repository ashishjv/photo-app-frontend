import { MessageService } from './../../service/message.service';
import { Photo } from './../../model/Photo';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/service/photo.service';
import { User } from 'src/app/model/User';
import { Album } from 'src/app/model/Album';
import { Comment } from 'src/app/model/Comment';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photoId!: string;
  photo!: Photo;
  photoUrl!: string;
  albumId!: string;

  comments: Comment[] = [];
  message: string = "";


  constructor(private photoService: PhotoService,
    private messageService: MessageService,
    private aRuote: ActivatedRoute,
    private router: Router) { }


  ngOnInit(): void {

    this.aRuote.paramMap.subscribe(
      respone => {
        //console.log(" *** photo details response on init = ", respone);
        this.photoId = respone.get('photoId')!;
        if (this.photoId != null) {
          this.photoService.getPhotoById(this.photoId).subscribe(
            response => {
              this.photo = <Photo>response;
              this.photoUrl = this.photo.photoUrl;
              this.albumId = this.photo.albumId;
            }
          );
          this.loadComments();
        }
      }
    )
  }

  loadComments() {
    this.messageService.getAllComments(this.photoId).subscribe(
      respone => {
        this.comments = (<Comment[]>respone).reverse();
      },
      err => {
        console.log("*** error fetching comments - ", err);
      }
    );
  }

  onDelete() {
    if (this.photoId != null) {
      this.photoService.deletPhoto(this.photoId).subscribe(response => {
      });
    }
  }

  makeThisProfilePhoto() {
    if (this.photoId != null) {
      this.photoService.makeThisProfilePhoto(this.photoUrl).subscribe(
        response => {
          var user: User = <User>response;
          console.log("*** Successfully changed profile photo. Redirecting to profile page.")
          this.router.navigate(['profile', user.id]);
        },
        err => {
          console.log("*** Failed changing profile photo. Http response = ", err);
        }
      );
    }
  }

  makeThisAlbumCover() {

    if (this.photoId != null) {
      this.photoService.makeThisAlbumCover(this.photoUrl, this.albumId).subscribe(
        response => {
          var album: Album = <Album>response;
          console.log("*** Successfully changed Album cover. Redirecting to album-details page.")
          this.router.navigate(['albums/me']);
        },
        err => {
          console.log("*** Failed changing Album cover. Http response = ", err);
        }
      );
    }
  }

  postComment() {
    if (this.message != "") {
      let newComment: Comment = new Comment();
      newComment.photoId = this.photoId;
      newComment.message = this.message;

      this.messageService.postMessage(newComment).subscribe(
        response => {
          console.log("Posted comment successfully");
          this.message = "";
          this.loadComments();
        }
      );
    }
  }

  changOrderOfComments(){
    this.comments.reverse();
  }

}
