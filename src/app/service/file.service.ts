import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }

  uploadFile(file:File){
    var formData = new FormData();    
    formData.append("file0",file);
    return this.http.post(environment.API_REST_URL_base+"files/upload",formData);
  }

  deleteFile(fileId:string){
    let params = new HttpParams();
    params.append('fielId','f123')
    return this.http.delete(environment.API_REST_URL_base+"files",{params});
  }

}
