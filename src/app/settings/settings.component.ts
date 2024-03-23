import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { SettingsService } from '../settings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MatMenuModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {
  constructor(
    private settingsService: SettingsService,
    private router: Router
  ) {}

  handleItemClick(menuItem: string): void {
    if (menuItem === 'User') {
      this.router.navigate(['/dashboard/user-settings']);
    } else if (menuItem === 'Contact') {
      this.router.navigate(['/dashboard/contact-settings']);
    }
  }
}
