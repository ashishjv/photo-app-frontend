import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../model/Comment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

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

  postMessage(comment: Comment) {
    var headers = this.getIdTokenHeader();

    if (headers != null) {
      return this.http.post(environment.API_REST_URL_base + "photos/comments",comment, { 'headers': headers });
    }
    else {
      return this.http.get(environment.API_REST_URL_base);
    }
  }

  getAllComments(photoId:string) {
    var headers = this.getIdTokenHeader();

    if (headers != null) {
      return this.http.get(environment.API_REST_URL_base + "photo/"+photoId+"/comments", { 'headers': headers });
    }
    else {
      return this.http.get(environment.API_REST_URL_base);
    }
  }
}
