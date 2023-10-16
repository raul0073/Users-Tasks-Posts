import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  public isPopUp: boolean = false;
  public alertMsg: string = '';
  public alertColor: string = '';

  changeMsg(msg: string, color: string) {
    this.alertMsg = msg;
    if(color != undefined){
      this.alertColor = color;
    }
    else{
      this.alertColor = 'black'
    }
    
    this.isPopUp = true;
  }

  hidePopUp() {
    this.isPopUp = false;
  }
}