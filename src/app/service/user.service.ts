import { LoggingService } from './logging.service';
import { User } from './../model/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import firebase from "firebase/app";
import "firebase/auth";
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {

  private myAuth!: firebase.auth.Auth;
  private defaultProfilePhotoURL: string = "https://www.w3schools.com/w3images/avatar2.png";

  idToken: Promise<string> | null = null;

  private currEmail:string | null = null;

  constructor(private router: Router,
    private http: HttpClient,
    private loggingService:LoggingService) {
    this.myAuth = firebase.initializeApp(environment.firebase).auth();
    this.subscribeToIdTokenChange();
  }

  subscribeToIdTokenChange() {
    this.myAuth.onAuthStateChanged((res) => {
      if (res) {
        this.idToken = res.getIdToken();
      }
      else {
        this.idToken = null;
      }

      this.idToken?.then(
        val => {
          localStorage.setItem('stringIdToken', val);
        }
      );
    }
    );
  }

  canActivate(): boolean {
    if (localStorage.getItem('stringIdToken') != null) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

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

  getCurrentUserProfileData() {
    var headers = this.getIdTokenHeader();
    if (headers != null) {
      return this.http.get(environment.API_REST_URL_base + "user", { 'headers': headers });
    }
    else{
      return this.http.get(environment.API_REST_URL_base);
    }
  }

  updateUserProfileData(user:User){
    var headers = this.getIdTokenHeader();
    if (headers != null) {
      console.log("*** going for post");
      return this.http.post(environment.API_REST_URL_base + "user", user, { 'headers': headers });
    }
    else{
      return this.http.get(environment.API_REST_URL_base);
    }
  }

  async signup(name: string, email: string, password: string) {
    console.log("Inside signup");
    try {
      this.currEmail = email;
      await this.myAuth.createUserWithEmailAndPassword(email, password);
      console.log("SignedUp Successfully - ", name, " email - ", this.currEmail);
      this.registerUser(this.currEmail, name);
    }
    catch (e) {
      console.log('Something went wrong:', e.message);
      this.loggingService.newLog(e.message);
    }
  }

  async registerUser(email: string, name: string) {
    let user: User = new User();
    user.email = email;
    user.name = name;
    user.profilePhotoUrl = this.defaultProfilePhotoURL;


    console.log("passing user to register - ", user.name, " email - ", user.email);
    this.http.post(environment.API_REST_URL_base + "user/register", user)
      .subscribe(
        respone => {
          console.log("Registered Successfully - ", name);
          this.router.navigate(['/albums/recent']);
        }
      );
  }

  async login(email: string, password: string) {
    try {
      await this.myAuth.signInWithEmailAndPassword(email, password);
      console.log("rerouting to /album/recent from userService.login");
      this.router.navigate(['/albums/recent']);
    }
    catch (e) {
      console.log('Something went wrong:', e.message);
      this.loggingService.newLog(e.message);
    }
  }

  async logout() {
    localStorage.clear();
    this.router.navigate(['login']);
    await this.myAuth.signOut();
  }

}
