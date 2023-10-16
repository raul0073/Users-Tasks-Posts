import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserBoxComponent } from './components/user-box/user-box.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import {FormsModule} from '@angular/forms';
import { TodosComponent } from './components/todos/todos.component';
import { PostsComponent } from './components/posts/posts.component';
import { AddTodoComponent } from './components/todos/add-todo/add-todo.component';
import { AlertBoxComponent } from './components/alert-box/alert-box.component';
import { SearchComponent } from './components/errors/search/search.component';
import { AddPostComponent } from './components/posts/add-post/add-post.component';
import { UsersComponent } from './components/errors/users/users.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    UserBoxComponent,
    UserDetailsComponent,
    AddUserComponent,
    TodosComponent,
    PostsComponent,
    AddTodoComponent,
    AlertBoxComponent,
    SearchComponent,
    AddPostComponent,
    UsersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
