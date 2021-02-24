import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showSignInForm = true;

  name:string ="";
  email:string = "";
  password:string = "";

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  makeSignInFormVisible(){
    this.showSignInForm=true;
  }
  makeSignUpFormVisible(){
    this.showSignInForm=false;
  }

  login(){
    console.log("login click worked");
    this.userService.login(this.email,this.password);
    this.email="";
    this.password="";
  }

  signup(){
    console.log("signup click worked");
    this.userService.signup(this.name,this.email,this.password);
    this.name="";
    this.email="";
    this.password="";
  }

}
