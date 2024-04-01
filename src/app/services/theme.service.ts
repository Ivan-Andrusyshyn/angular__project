import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'appTheme';
  themeSubject: BehaviorSubject<string>;

  constructor() {
    const savedTheme = localStorage.getItem(this.THEME_KEY);
    this.themeSubject = new BehaviorSubject<string>(savedTheme || 'light');
    this.applyTheme(savedTheme || 'light');
  }

  setTheme(theme: string): void {
    if (theme === 'light' || theme === 'dark') {
      this.themeSubject.next(theme);
      localStorage.setItem(this.THEME_KEY, theme);
      this.applyTheme(theme);
    } else {
      console.error('Invalid theme:', theme);
    }
  }

  getTheme(): string {
    return this.themeSubject.value;
  }

  private applyTheme(theme: string): void {
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }
}
