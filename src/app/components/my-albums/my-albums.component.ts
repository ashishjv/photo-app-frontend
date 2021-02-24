import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/model/Album';
import { AlbumService } from 'src/app/service/album.service';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {

  albums: Album[] = [];

  constructor(private albumService:AlbumService) { }

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe(
      response => {
        this.albums = <Album[]>response
        //console.log("Got all album :", response)
      }
    );
  }

}
