import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/UserInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {
    this.loadUserFromLocalStorage();
  }

  users: User[] = [];
  authUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  loadUserFromLocalStorage(): void {
    const userString = localStorage.getItem('USER');
    const user = userString ? (JSON.parse(userString) as User) : null;
    this.authUser.next(user);
  }

  private onStorage(newUser: User, type: string) {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('USER', JSON.stringify(newUser));
    if (type === 'R') {
      localStorage.setItem('USERS', JSON.stringify(this.users));
    }
  }

  registration(newUser: User): void {
    const existingUser = this.users.find(
      (user) => user.email === newUser.email
    );
    if (existingUser) {
      alert('User with this email already exists!');
      return;
    }
    const userWithId: User = { ...newUser, id: Date.now() };
    this.users.push(userWithId);
    this.onStorage(userWithId, 'R');
    this.authUser.next(userWithId);
    this.router.navigate(['/dashboard']);
  }

  login(loggedUser: { email: string; password: string }): void {
    const storedUsers = localStorage.getItem('USERS');
    if (!storedUsers) {
      alert('No users registered yet!');
      return;
    }

    this.users = JSON.parse(storedUsers);

    const user = this.users.find(
      (user) =>
        user.email === loggedUser.email && user.password === loggedUser.password
    );
    if (user) {
      this.authUser.next(user);
      this.onStorage(user, 'L');
      this.router.navigate(['/dashboard']);
    } else {
      localStorage.removeItem('isAuthenticated');
      console.log('Invalid email or password!');
    }
  }

  updateUser(updatedUser: User): void {
    localStorage.setItem('USER', JSON.stringify(updatedUser));
    this.authUser.next(updatedUser);
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('USER');
    this.authUser.next(null);
    this.router.navigate(['/']);
  }

  isAuthenticatedUser(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}
