import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User { 
  avatar: string;
  name: string;
  bio: string;
  location: string;
  website: string;
  stats: {
    posts: number;
    followers: number;
    following: number;
  };
  badges: string[];
  userFrameworks: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: User): void {
    this.userSubject.next(user);
  }

  clearUser(): void {
    this.userSubject.next(null);
  }
}
