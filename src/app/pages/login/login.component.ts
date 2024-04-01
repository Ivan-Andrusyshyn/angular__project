import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, AuthFormComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,

    private fb: FormBuilder,
    private router: Router
  ) {}

  performLogin(authData: { email: string; password: string }): void {
    this.authService.login(authData);
  }
}
