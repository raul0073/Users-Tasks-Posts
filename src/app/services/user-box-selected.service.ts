import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserBoxSelectedService {

  constructor() { }

  private selectedUserIdSubject = new BehaviorSubject<string | null>(null);

  // set event 
  $selectedUserId = this.selectedUserIdSubject.asObservable();

  setSelectedUserId(userId: string) {
    // emit the next value after change
    this.selectedUserIdSubject.next(userId);
  }
}

