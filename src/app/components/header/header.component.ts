import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { AuthService } from '../../auth.service';
import { User } from '../../models/UserInterface';
import { SettingsComponent } from '../settings/settings.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SettingsComponent, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user: User | null = null;
  theme = 'light';
  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.authService.authUser
      ?.pipe(takeUntilDestroyed())
      .subscribe((user: User | null) => {
        this.user = user;
      });
    this.theme = themeService.getTheme();
  }

  toggleTheme() {
    const currentTheme = this.themeService.getTheme();
    this.theme = currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setTheme(this.theme);
  }
}
