import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { User } from '../../models/UserInterface';
import { SettingsComponent } from '../settings/settings.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SettingsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: User | null = null;
  theme = 'light';
  constructor(private authService: AuthService) {
    this.authService.authUser?.pipe(takeUntilDestroyed()).subscribe(
      (user: User | null) => {
        this.user = user;
      }
    );
  }

  setLightTheme(newTheme: string): void {
    this.theme = newTheme;
  }

  setDarkTheme(newTheme: string): void {
    this.theme = newTheme;
  }
  getCurrentTheme(): string {
    return this.theme;
  }

 
}
