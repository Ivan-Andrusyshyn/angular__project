import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: any = {};
  constructor(private authService: AuthService, private router: Router) {}

  performLogin(userData: any): void {
    const { email, password } = userData;
    this.authService.login(email, password);
  }
}
