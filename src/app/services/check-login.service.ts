import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginService {

  constructor() { }

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  isLoggedIn(): boolean {
    return this.loggedInSubject.value; 
  }

  login(): void {
    this.loggedInSubject.next(true);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }
}
