import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MyAlbumsComponent } from './components/my-albums/my-albums.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateAlbumComponent } from './components/create-album/create-album.component';
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { UploadPictureComponent } from './components/upload-picture/upload-picture.component';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { RecentAlbumsComponent } from './components/recent-albums/recent-albums.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MyAlbumsComponent,
    ProfileComponent,
    CreateAlbumComponent,
    AlbumDetailsComponent,
    UploadPictureComponent,
    PhotoDetailsComponent,
    RecentAlbumsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
