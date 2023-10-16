import { Component, Input } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.scss']
})
export class AlertBoxComponent {

  @Input() alertMessage: string = 'alert message';

  constructor(public feedbackService: FeedbackService){}


  hidePopUp() {
    this.feedbackService.hidePopUp();
  }

}
