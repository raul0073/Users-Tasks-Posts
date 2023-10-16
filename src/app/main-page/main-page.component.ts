import { Component, Output } from '@angular/core';
import { UserFull } from '../classes/user-full';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { FeedbackService } from '../services/feedback.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { UserBoxSelectedService } from '../services/user-box-selected.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  providers: [UserBoxSelectedService]
})

export class MainPageComponent {

  constructor(private http: HttpClient,
    private userS: UserService,
    private router: RouterModule,
    private feedService: FeedbackService) { }

  // variable to fill with data
  userDetails: UserFull[] = [];
  noResultsFound: boolean = false;
  isPopUp: boolean = false;
  
  // function will get all users details from service
  getPageUsers() {
    this.userS.getUsers('http://localhost:3232/users').subscribe((users: UserFull[]) => {
      this.userDetails = users;
      if(users.length === 0) {
        console.log("no users")
      }
      // check if tasks are completed
      this.userDetails.forEach((user: UserFull) => {
        const allTasksCompleted = user.tasks.every(task => task.completed);
        user.allTasksCompleted = allTasksCompleted;
      });
    });
  }

  // function will handle search results
  // takers searchterm as argument (string)
  getSearchResults(term: string) {
    this.userS.getUsers('http://localhost:3232/users').subscribe((users: UserFull[]) => {
      this.userDetails = users.filter(user => {
        // filter response
        return (user.name && user.name.toLowerCase().includes(term)) || (user.email && user.email.toLowerCase().includes(term));
      });
      if (this.userDetails.length === 0 && term.length != 0) {
        // set bool for error search component
        this.noResultsFound = true;
      }else{
        this.noResultsFound = false;
      }
    });
  }



  ngOnInit(): void {
    this.getPageUsers();
    this.noResultsFound = false;
    // this.isPopUp = false;
  }
}
