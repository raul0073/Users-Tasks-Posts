import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeViewService {
  // task service and event
  private isAddTodoOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAddTodoOpen$ = this.isAddTodoOpenSubject.asObservable();


  // posts service
  private isAddPostOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAddPostOpen$ = this.isAddPostOpenSubject.asObservable();

  constructor() { }

  // task function
  public setIsAddTodoOpen(value: boolean): void {
    this.isAddTodoOpenSubject.next(value);
  }
  // posts function
  public setIsAddPostOpen(value: boolean): void {
    this.isAddPostOpenSubject.next(value);
  }

}