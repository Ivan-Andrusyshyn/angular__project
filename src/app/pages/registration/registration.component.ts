import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { NgIf } from '@angular/common';
import { User } from '../../models/UserInterface';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, AuthFormComponent, RouterLink, NgIf],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  constructor(private authService: AuthService, private router: Router) {}

  performRegistration(authData: User): void {
    this.authService.registration(authData);
  }
}
