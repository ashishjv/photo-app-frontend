import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  public logMessages:string[]=[];

  constructor() { }

  newLog(logMessage:string){
    this.logMessages.unshift(logMessage);
    this.logMessages = this.logMessages.slice(0,2);
  }

  clearLogMessages(){
    this.logMessages = [];
  }

}
