import { Component, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { UserFull, Task } from 'src/app/classes/user-full';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ChangeViewService } from 'src/app/services/change-view.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent {

  // page flag for child, if open
  @Output() isAddTodoPage: boolean = false;
  // user ID initiolize
  userId: string | null = null;
  selectedUserId: string = "";
  // new task obj
  newTask: Task = { title: '', completed: false };


  constructor(public route: ActivatedRoute,
    public loc: Location,
    public userService: UserService,
    public msgService: FeedbackService,
    public changeV: ChangeViewService) { }


  // get user id from session storage
  getId(): any {
    let id = sessionStorage.getItem('userId');
    let char = id?.indexOf('""""')
    char = Number(char)
    return (id?.toString().slice(7, char - 1));
  }


  // add task to user
  addTask() {
    this.selectedUserId = this.getId();
    this.userService.addTodo(this.selectedUserId, this.newTask).subscribe({
      next: response => {
        this.msgService.changeMsg("Task added successfully", 'green');
        this.newTask.title = "";
      },
      error: error => {
        console.error('Error adding task to user:', error);
      }

    });
  }

  // toggle view
  toggleAddTodo(): void {
    this.changeV.setIsAddTodoOpen(!this.isAddTodoPage);
  }

  ngOnInit() {
    // sunscribe to the which is page? is showing in 
    this.changeV.isAddTodoOpen$.subscribe((value: boolean) => {
      this.isAddTodoPage = value;
    })
    // this.testingUSERID = this.getId();
    console.log(this.getId());
  }

}