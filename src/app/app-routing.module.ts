import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { AlbumDetailsComponent } from './components/album-details/album-details.component';
import { CreateAlbumComponent } from './components/create-album/create-album.component';
import { LoginComponent } from './components/login/login.component';
import { MyAlbumsComponent } from './components/my-albums/my-albums.component';
import { PhotoDetailsComponent } from './components/photo-details/photo-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecentAlbumsComponent } from './components/recent-albums/recent-albums.component';
import { UploadPictureComponent } from './components/upload-picture/upload-picture.component';

/* Services */
import { UserService } from './service/user.service';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'albums/recent', component:RecentAlbumsComponent, canActivate:[UserService] },
  { path: 'profile/:profileId', component: ProfileComponent, canActivate:[UserService]  },
  { path: 'albums/me', component:MyAlbumsComponent, canActivate:[UserService] },
  { path: 'create', component:CreateAlbumComponent, canActivate:[UserService] },
  { path: 'album/:albumId', component:AlbumDetailsComponent, canActivate:[UserService] },
  { path: 'upload/:albumId', component:UploadPictureComponent, canActivate:[UserService] },
  { path: 'photo/:photoId', component:PhotoDetailsComponent, canActivate:[UserService] },
  { path: '**', pathMatch:'full',redirectTo: 'albums/recent'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
