import { Injectable } from '@angular/core';
import { Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllTasksCompletedService {

  constructor() { }
  public isAllTasksCompletedSubject = new Subject<boolean>();


  // look for changes in alltask completed flags
  $allTasksCompleted = this.isAllTasksCompletedSubject.asObservable();

  setAllTasksCompleted(completed: boolean) {
    this.isAllTasksCompletedSubject.next(completed);
  }
}
