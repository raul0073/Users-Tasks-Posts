
import { Component, Input } from '@angular/core';
import { UserFull } from 'src/app/classes/user-full';
import { UserService } from 'src/app/services/user.service';
import { UpdateUser } from 'src/app/classes/update-user';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserBoxSelectedService } from 'src/app/services/user-box-selected.service';
import { AllTasksCompletedService } from 'src/app/services/all-tasks-completed.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.scss']
})
export class UserBoxComponent {

  constructor(private userService: UserService,
    public msgService: FeedbackService,
    public selectedS: UserBoxSelectedService,
    public tasksCompletedS: AllTasksCompletedService) { }

  // set subsription to all events on init for destruction
  private selectedUserSubscription: Subscription | undefined;
  private allTasksCompletedSubscription: Subscription | undefined;

  //showmore set to falsel
  showMore: boolean = false;
  // selected user id
  selectedUserId: string | null = null;
  // user id for selected box
  @Input() userId: string | undefined;
  // color change flag
  isSelected = false;


  // obj to fill
  @Input() userData: UserFull | undefined;
  // empty object to fill with updated object
  @Input() updatedUser = new UpdateUser();
  // change box color if task are finished
  @Input() allTasksCompleted: boolean = false;


  // ask for conformation
  // delete user from db
  confirmDelete(id: any) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.delUser(id)
      this.msgService.changeMsg("User deleted successfully", 'red');
    };
  }

  // delete user from db
  delUser(id: any) {
    this.userService.deleteUser(id).subscribe(data => {
      return data
    })
  }

  // update user details
  upUser(id: string, user: UpdateUser) {
    this.updatedUser = user;
    this.updatedUser.name = user.name;
    this.updatedUser.email = user.email;
    this.updatedUser.street = user.street;
    this.updatedUser.city = user.city;
    this.updatedUser.zipcode = user.zipcode
    this.userService.updateUser(id, this.updatedUser).subscribe(data => {
      return data;
    });
    this.msgService.changeMsg("User updated successfully", 'green')
  }

  // fill updated user object on init
  ngOnInit() {
    // on init update update user obj to the current user details 
    if (this.userData) {
      this.updatedUser.name = this.userData.name;
      this.updatedUser.email = this.userData.email;
      this.updatedUser.street = this.userData.street;
      this.updatedUser.city = this.userData.city;
      this.updatedUser.zipcode = this.userData.zipcode;
    }
    // subscribe to selected box event with da selected usr
    this.selectedS.$selectedUserId.subscribe(selectedUserId => {
      this.isSelected = selectedUserId === this.userId;
    });

    //subscribe to all tasks completed event
    this.allTasksCompletedSubscription = this.tasksCompletedS.$allTasksCompleted.subscribe(
      (tasksCompleted) => {
        this.allTasksCompleted = tasksCompleted;
      })
  }

  // handle which user is selected
  selectUser(userId: string) {
    this.selectedS.setSelectedUserId(userId);
    // change color
    this.isSelected = true;
  }

  ngOnDestroy() {
    // unsub to all events on init  
    if (this.selectedUserSubscription) {
      this.selectedUserSubscription.unsubscribe();
    }

    if (this.allTasksCompletedSubscription) {
      this.allTasksCompletedSubscription.unsubscribe();
    }
  }
}
