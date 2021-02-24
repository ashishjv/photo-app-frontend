import { LoggingService } from './service/logging.service';
import { Component } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Photo Album Application';
  
  constructor(public readonly userService:UserService,
    public loggingService:LoggingService) { }

  logout(){
    this.userService.logout();
  }

  clearLogMessages(){
    this.loggingService.clearLogMessages();
  }
}
