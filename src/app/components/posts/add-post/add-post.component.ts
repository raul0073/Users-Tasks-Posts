import { Component, Output } from '@angular/core';
import { UserFull, Post } from 'src/app/classes/user-full';
import { ChangeViewService } from 'src/app/services/change-view.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent {
  public isAddPostPage: boolean = false;
  public selectedUserId: string = "";
  constructor(public changeV: ChangeViewService,
            public userService: UserService,
            public msgService: FeedbackService){}

  newPost: Post = { _id: "", title: '', body: "" };

  // cancel logic
  toggleAddPostView(): void {
    this.changeV.setIsAddPostOpen(this.isAddPostPage);
  }

  // get user id from session storage
  getId(): any {
    let id = sessionStorage.getItem('userId');
    let char = id?.indexOf('""""')
    char = Number(char)
    return (id?.toString().slice(7, char - 1));
  }

  // add task to user
  addPost() {
    this.selectedUserId = this.getId();
    this.userService.addPost(this.selectedUserId, this.newPost).subscribe({
      next: response => {
        this.msgService.changeMsg("Task added successfully", 'green');
        this.newPost = { _id: "", title: '', body:""}
      },
      error: error => {
        console.error('Error adding task to user:', error);
      }

    });
  }
}
