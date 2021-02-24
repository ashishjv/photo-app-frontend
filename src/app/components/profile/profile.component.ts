import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId!: string;
  user: User | null = null;
  name: string | null = "Name Unknown";
  email?: string = "";
  curImgURL: string = 'https://secondchancetinyhomes.org/wp-content/uploads/2016/09/empty-profile.png';
  newImgURL: string = "";

  viewMode: string | null = "yes";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getCurrentUserProfileData().subscribe(
      response => {
        this.user = <User>response;
        this.email = this.user.email;
        if (this.user.profilePhotoUrl != "" && this.user.profilePhotoUrl != null) {
          this.curImgURL = this.user.profilePhotoUrl;
        }
        if (this.user.name != "" && this.user.profilePhotoUrl != null) {
          this.name = this.user.name;
        }
      }
    );
  }



  onEdit() {
    this.viewMode = null;
    this.newImgURL = this.curImgURL;
  }

  onSave() {
    this.viewMode = "yes";
    this.curImgURL = this.newImgURL;
    if (this.user != null) {
      if (this.name != null) {
        this.user.name = this.name;
      }
      if (this.curImgURL != "") {
        this.user.profilePhotoUrl = this.curImgURL;
      }
      this.userService.updateUserProfileData(this.user).subscribe(
        response => {
          console.log("*** Updated profile response ="+response);
        }
      )
    }
  }

  onCheck() {
    this.curImgURL = this.newImgURL;
  }

}
