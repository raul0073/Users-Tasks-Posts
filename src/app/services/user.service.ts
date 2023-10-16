import { Injectable } from '@angular/core';
import { UserFull, Task, Post } from '../classes/user-full';
import { NewUser } from '../classes/new-user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  // get all users data
  getUsers(url: string): Observable<UserFull[]> {
    return this.http.get<UserFull[]>(url)
  }

  // get user by id
  getUserById(id: string): Observable<UserFull> {
    const url = `http://localhost:3232/users/${id}`;
    return this.http.get<UserFull>(url);
  }

  // add new user
  addUser(user: NewUser): Observable<UserFull> {
    const url = 'http://localhost:3232/users'
    return this.http.post<UserFull>(url, user);
  }

  //update user
  updateUser(id: any, user: any) {
    const url = `http://localhost:3232/users/${id}`;
    return this.http.put<any>(url, user);
  }

  // delete a user
  deleteUser(id: number) {
    const url = 'http://localhost:3232/users/' + id
    return this.http.delete<UserFull>(url);
  }

  // --------------------------- ADD TASK TO USER ---------------- \\\
  // add task to user
  addTodo(id: string, todoObj: Task): Observable<Task> {
    const url = `http://localhost:3232/users/${id}/tasks`;
    // create new task obj to add id
    const task = {
      _id: null,
      title: todoObj.title,
      completed: false
    };
    return this.http.post<Task>(url, task);
  }

  // --------------------------- MARK TASK AS COMPLETED TO USER ---------------- **** NOT WORKING **** \\\ 
  // update task status 
  markTaskAsCompleted(id: string, taskObj: Task | any): Observable<Task> {
    const url = `http://localhost:3232/users/${id}/tasks`;
    // send only task id and status
    taskObj = {
      _id: taskObj._id,
      completed: true
    }
    console.log("marked");

    return this.http.put<Task>(url, taskObj);
  }

  // --------------------------- ADD POST TO USER ---------------- \\\
  // add task to user
  addPost(id: string, postObj: Post): Observable<Post> {
    const url = `http://localhost:3232/users/${id}/posts`;

    const post = {
      _id: null,
      title: postObj.title,
      body: postObj.body
    };
    console.log(post);
    return this.http.post<Post>(url, post);
  }
}
