import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/model/Album';
import { AlbumService } from 'src/app/service/album.service';

@Component({
  selector: 'app-recent-albums',
  templateUrl: './recent-albums.component.html',
  styleUrls: ['./recent-albums.component.css']
})
export class RecentAlbumsComponent implements OnInit {
  albums: Album[] = [];
  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe(
      response => {
        this.albums = (<Album[]>response).reverse();
        //this.albums.sort()
        //console.log("Got all album :", response)
      }
    );
  }
}
