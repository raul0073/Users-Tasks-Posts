import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddUserComponent} from './components/add-user/add-user.component';
import { AddTodoComponent } from './components/todos/add-todo/add-todo.component';
import { SearchComponent } from './components/errors/search/search.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';

const routes: Routes = [

  {
    path: 'addUser', 
    component: AddUserComponent
  },
  {
    path: 'user/:id',
    component: UserDetailsComponent,
  },
  {
    path: 'searchError',
    component: SearchComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
