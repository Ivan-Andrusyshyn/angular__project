import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [FormsModule, RouterLink],
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  user: any = {};
  constructor(private authService: AuthService, private router: Router) {}

  performLogin(userData: any): void {
    this.authService.registration(userData);
  }
}
