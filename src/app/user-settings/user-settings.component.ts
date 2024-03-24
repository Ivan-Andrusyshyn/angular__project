import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService,   } from '../auth.service';
import { Subscription } from 'rxjs';
import { Location, NgIf } from '@angular/common';
import { User } from '../models/UserInterface';

@Component({
  selector: 'app-user-settings',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css',
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  user: User | null = null;

  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private location: Location) {}

  changeUserData(userData: any) {
    this.authService.updateUser(userData);
    this.location.back();
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.authUser.subscribe(
      (user: User | null) => {
        this.user = user;
      }
    );
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
