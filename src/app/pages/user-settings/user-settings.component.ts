import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Location, NgIf } from '@angular/common';
import { User } from '../../models/UserInterface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
