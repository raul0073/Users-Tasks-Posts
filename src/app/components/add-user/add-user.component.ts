import { Component } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { NewUser } from 'src/app/classes/new-user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  newUser: NewUser = new NewUser("","");

  constructor(private userService: UserService,
              public msgService: FeedbackService) {}

  addUser() {
    this.userService.addUser(this.newUser).subscribe({
      next: response => {
        this.msgService.changeMsg('User added successfully', 'green');
        return this.newUser = {name:"",email:""}
      },
      error: error => {
        console.error('Error adding new user:', error);
      }
    });
  }
}