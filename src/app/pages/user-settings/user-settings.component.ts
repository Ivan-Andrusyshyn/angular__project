import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Location, NgIf } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, AuthFormComponent],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css',
})
export class UserSettingsComponent {
  constructor(private authService: AuthService, private location: Location) {}

  changeUserData(userData: any) {
    const userWithId = { ...userData, id: this.authService.authUser.value?.id };
    this.authService.updateUser(userWithId);
    this.location.back();
  }
}
