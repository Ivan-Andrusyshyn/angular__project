import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../settings.service';

@Component({
  selector: 'app-contact-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-settings.component.html',
  styleUrl: './contact-settings.component.css'
})
export class ContactSettingsComponent {
  constructor(public settingsService:SettingsService){}

  saveSettings(): void {
    this.settingsService.saveSettings();
  }
}
