import { Component, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFull } from 'src/app/classes/user-full';
import { UserService } from 'src/app/services/user.service';
import { ChangeViewService } from 'src/app/services/change-view.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {

  userData: UserFull | undefined;
  private userServiceSub: Subscription | undefined;
  @Output() isAddPostPage: boolean = false;

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    public changeV: ChangeViewService) { }



  toggleAddPost(): void {
    this.changeV.setIsAddPostOpen(!this.isAddPostPage);
  }
  ngOnInit(): void {
    this.changeV.isAddPostOpen$.subscribe((value: boolean) => {
      this.isAddPostPage = value;
    })

    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        // Call the userService to get the user by ID
        this.userService.getUserById(userId).subscribe({
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
  ngOnDestroy() {
    this.userServiceSub?.unsubscribe();
  }
}