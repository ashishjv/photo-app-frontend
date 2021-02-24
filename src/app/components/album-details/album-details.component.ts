import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/model/Photo';
import { AlbumService } from 'src/app/service/album.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {

  albumId!: string | null;
  photos: Photo[] = [];

  constructor(private albumService: AlbumService,
    private aRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.aRoute.paramMap.subscribe(
      response => {
        this.albumId = response.get('albumId');
        if (this.albumId != null) {
          this.albumService.getAllPhotosInAlbum(this.albumId).subscribe(
            response => {
              this.photos = <Photo[]><unknown>response;
            }
          );
        }
        else {
          console.log("*** in esle part ***");
          this.router.navigate(['album/me']);
        }
      }
    );

  }
}
