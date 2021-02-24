import { PhotoService } from './../../service/photo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from './../../model/Photo';
import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {

  albumId: string | null = "";
  uploadButtonEnable: string | null = null;
  photoFile!: File;
  fileId!: string;

  constructor(private aRoute: ActivatedRoute,
    private router: Router,
    private fileService: FileService,
    private photoService: PhotoService) { }

  ngOnInit(): void {
    this.aRoute.paramMap.subscribe(
      response => {
        this.albumId = response.get('albumId');
      }
    );
  }

  enableUploadButton(event: any) {
    this.uploadButtonEnable = "yes";
    this.photoFile = event.target.files[0];
  }

  uploadNewPhoto() {
    this.fileService.uploadFile(this.photoFile).subscribe(
      fileResponse => {
        //console.log(" File upload response = ", fileResponse);
        this.fileId = JSON.parse(JSON.stringify(fileResponse))["fileId"];
        //console.log(" *** FileId = ", this.fileId);
        this.savePhoto(this.fileId);
      });
  }

  savePhoto(fileId:string)
  {
    if(this.albumId != null){
      this.photoService.saveNewPhoto(this.albumId, fileId)
      .subscribe(
        response => {
          //var photo: Photo = <Photo><unknown>(response);
          //var photoId = photo.id;
          //console.log("*** printing photoId: ",photoId);
          //this.router.navigate(['photo/', photoId]);
          this.router.navigate(['album/',this.albumId]);
        }
      )
    }
  }
}
