import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Album } from '../model/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getIdTokenHeader() {
    var stringToken = localStorage.getItem('stringIdToken');
    if (stringToken != null) {

      // const headers = new HttpHeaders()
      // .set('content-type','application/json')
      // .set('Access-Control-Allow-Origin','*')
      // .set('idToken',stringToken);

      // headers.append('idToken',stringToken);

      var headers = {
        'idToken': stringToken,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      };
      return headers;
    }
    else {
      return null;
    }
  }

  getAllAlbums() {
    var headers = this.getIdTokenHeader();
    if (headers != null) {
      return this.http.get(environment.API_REST_URL_base + "albums", { 'headers': headers });
    }
    else {
      return this.http.get(environment.API_REST_URL_base);
    }
  }

  getAllPhotosInAlbum(albumId: string) {
    var headers = this.getIdTokenHeader();
    if (headers != null) {
      return this.http.get(environment.API_REST_URL_base + "albums/" + albumId + "/photos", { 'headers': headers });
    }
    else {
      return this.http.get(environment.API_REST_URL_base);
    }
  }

  createNewAlbum(albumName: string, coverPhotoFileId: string) {

    var headers = this.getIdTokenHeader();

    var album: Album = {
      coverPhotoUrl: environment.API_REST_URL_base + "files/show/" + coverPhotoFileId,
      createdBy: "",
      dateCreated: "",
      id: "",
      name: albumName
    }

    if (headers != null) {
      return this.http.post(environment.API_REST_URL_base + "albums/",album, { 'headers': headers });
    }
    else {
      return this.http.get(environment.API_REST_URL_base);
    }
  }

}
