import { Router } from '@angular/router';
import { AlbumService } from './../../service/album.service';
import { FileService } from './../../service/file.service';
import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/model/Album';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {

  albumName!: string;
  coverFile!: File;
  fileId!: string;
  createButtonEnable: string | null = null;

  constructor(private fileService: FileService,
    private albumService: AlbumService,
    private router: Router) { }

  ngOnInit(): void {

  }

  enableCreateButton(event: any) {
    this.createButtonEnable = "yes";
    this.coverFile = event.target.files[0];
    //console.log("event.target.files[0] = ", this.coverFile);
  }

  createNewAlbum() {
    this.fileService.uploadFile(this.coverFile).subscribe(
      fileResponse => {
        //console.log(" File upload response = ", fileResponse);
        this.fileId = JSON.parse(JSON.stringify(fileResponse))["fileId"];
        //console.log(" *** FileId = ", this.fileId);
        this.saveAlbum(this.albumName, this.fileId);
      });
  }

  saveAlbum(albumName: string, fileId: string) {
    //console.log("*** save album ( \"",albumName,"\" , \"",fileId,"\" ) ***");
    this.albumService.createNewAlbum(albumName, fileId)
      .subscribe(
        albumResponse => {
          //console.log("*** New album created successfully *** => ",albumResponse);
          var album: Album = <Album><unknown>(albumResponse);
          var albumId = album.id;
          //console.log("*** printing albumId: ",albumId);
          this.router.navigate(['album/', albumId]);
        }
      );

  }


}
