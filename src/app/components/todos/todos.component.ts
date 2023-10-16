import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFull, Task } from 'src/app/classes/user-full';
import { UserService } from 'src/app/services/user.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ChangeViewService } from 'src/app/services/change-view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})

export class TodosComponent implements OnInit {
  private changeViewSubscription: Subscription | undefined;
  private getUserId: Subscription | undefined;

  // user object full
  userData: UserFull | undefined;
  // is add todo page
  @Output() isAddTodoPage: boolean = false;
  // max number of todos to open
  maxTodosToRender: number = 3;
  // userID
  userId: string = "";
  // updated task object
  updatedTask: Task = { _id: "", title: "", completed: true };

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    public feedbackService: FeedbackService,
    public changeV: ChangeViewService) { }


  // toggle change view state
  toggleAddTodoView(): void {
    this.changeV.setIsAddTodoOpen(!this.isAddTodoPage);
  }

  // show more todos
  showMoreItems(): any {
    if (this.maxTodosToRender === 3) {
      return this.maxTodosToRender = 100;
    }
    if (this.maxTodosToRender === 100) {
      return this.maxTodosToRender = 3;
    }
  }


  // mark task completed
  markCompleted(task: Task) {
    {task.completed = true};
    this.userService.markTaskAsCompleted(this.userId, task);
    this.feedbackService.changeMsg('Task marked completed', 'green');
  }

  
  ngOnInit(): void {
    // sunscribe to the which is page? is showing in 
    this.changeV.isAddTodoOpen$.subscribe((value: boolean) => {
      this.isAddTodoPage = value;
    })
    // get the user id
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      let sessionObj = {
        id: this.userId,
      }
      sessionStorage.setItem('userId', JSON.stringify(sessionObj));
      if (this.userId) {
        // userService to get the user by ID
        this.userService.getUserById(this.userId).subscribe({
          next: (user: UserFull) => {
            this.userData = user;
          },
          error: (error) => {
            console.error('Error retrieving user:', error);
          }
        });
      } else {
        console.error('User ID is null.');
      }
    })
  }
  ngOnDestroy(){
    this.getUserId?.unsubscribe();
    this.changeViewSubscription?.unsubscribe();
  }
}
