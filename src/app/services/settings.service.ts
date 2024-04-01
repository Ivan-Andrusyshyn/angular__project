import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ContactOptions {
  showFirstName: boolean;
  showLastName: boolean;
  showEmail: boolean;
  showPhoneNumber: boolean;
  showDescription: boolean;
  showCompany: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  contactOptions: ContactOptions = {
    showFirstName: true,
    showLastName: true,
    showEmail: true,
    showPhoneNumber: true,
    showDescription: true,
    showCompany: true,
  };

  private contactOptionsSubject: BehaviorSubject<ContactOptions> | null = null;

  constructor() {
    this.loadSettings();
  }

  private initializeSubject(): void {
    if (!this.contactOptionsSubject) {
      this.contactOptionsSubject = new BehaviorSubject<ContactOptions>(this.contactOptions);
    }
  }

  saveSettings(): void {
    this.initializeSubject();
    localStorage.setItem('contactSettings', JSON.stringify(this.contactOptions));
    this.contactOptionsSubject?.next(this.contactOptions);  
  }

  loadSettings(): void {
    this.initializeSubject();
    const settingsString = localStorage.getItem('contactSettings');
    if (settingsString) {
      const settings: ContactOptions = JSON.parse(settingsString);
      this.contactOptions = { ...this.contactOptions, ...settings };
      this.contactOptionsSubject?.next(this.contactOptions);  
    }
  }

  getContactOptions(): BehaviorSubject<ContactOptions> {
    this.initializeSubject();
    if (!this.contactOptionsSubject) {
      throw new Error('contactOptionsSubject is not initialized');
    }
    return this.contactOptionsSubject;
  }
}
