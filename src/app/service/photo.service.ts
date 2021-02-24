import { Photo } from './../model/Photo';
import { FileService } from './file.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient, private filService: FileService) { }

  getIdTokenHeader() {
    var stringToken = localStorage.getItem('stringIdToken');
    if (stringToken != null) {
      var headers = {
        'idToken': stringToken
      };
      return headers;
    }
    else {
      return null;
    }
  }

  // " GET: /api/photo - no inputs"
  getAllPhotos() {
    return this.http.get(environment.API_REST_URL_base + "photos");
  }

  getAllPhotosInAlbum(albumID: string) {
    var headers = this.getIdTokenHeader();
    if (headers != null) {
      return this.http.get(environment.API_REST_URL_base + "albums/" + albumID + "/photos");//,{{headers};{params:{albumId:albumID}};});
    }
    else {
      return this.http.get(environment.API_REST_URL_base);
    }
  }

  getPhotoById(photoID: string) {
    var headers = this.getIdTokenHeader();
    if (headers != null) {
      return this.http.get(environment.API_REST_URL_base + "photos/" + photoID, { 'headers': headers });
    }
    else {
      return this.http.get(environment.API_REST_URL_base);
    }
  }

  saveNewPhoto(albumId: string, fileId: string) {
    var photo: Photo = new Photo();
    photo.albumId = albumId;
    photo.photoUrl = environment.API_REST_URL_base + "files/show/" + fileId

    //console.log("*** PhotoUrl = ", photo.photoUrl);

    var headers = this.getIdTokenHeader();
    if (headers != null) {
      return this.http.post(environment.API_REST_URL_base + "photos", photo, { 'headers': headers });
    }
    else {
      return this.http.get(environment.API_REST_URL_base);
    }
  }

  deletPhoto(photoId: string) {
    return this.filService.deleteFile(photoId);
  }

  makeThisProfilePhoto(photoUrl: string) {
    let params: HttpParams = new HttpParams().set("photoUrl", photoUrl);
    var headers = this.getIdTokenHeader();

    if (headers != null) {
      return this.http.get(environment.API_REST_URL_base + "/user/makeProfilePic", { 'headers': headers, 'params': params });
    }
    else {
      return this.http.get(environment.API_REST_URL_base);
    }
  }

  makeThisAlbumCover(photoUrl: string, albumId: string) {
    let params: HttpParams = new HttpParams().set('photoUrl', photoUrl).set('albumId', albumId);
    var headers = this.getIdTokenHeader();
    
    if (headers != null) {

      // console.log("*** calling makeThisAlbumCover - params =  ",{'headers':headers,'params':params});
      // console.log("*** photourl =  ",photoUrl, " , albumId = ",albumId);
      // console.log("*** direct params photourl =  ",params.get('photoUrl'));
      return this.http.get(environment.API_REST_URL_base + "albums/coverphoto", { 'headers': headers, 'params':params });
    }
    else {
      return this.http.get(environment.API_REST_URL_base);
    }
  }
}
