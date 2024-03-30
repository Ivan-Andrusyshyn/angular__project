import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ContactsService } from '../../contacts.service';
import { NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { ContactTypes } from '../../models/ContactInterface';
import { ContactListComponent } from '../../components/contact-list/contact-list.component';
import { SearchContactComponent } from '../../components/search-contact/search-contact.component';
import { AddBtnContactComponent } from '../../components/add-btn-contact/add-btn-contact.component';
import { ThemeService } from '../../theme.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    ContactListComponent,
    AddBtnContactComponent,
    RouterOutlet,
    SearchContactComponent,
    NgIf,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  theme = 'light';

  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: ThemeService
  ) {
    const savedContact = localStorage.getItem('selectedContact');
    if (savedContact) {
      const parsedContact: ContactTypes = JSON.parse(savedContact);
      if (parsedContact && parsedContact.id) {
        this.router.navigate(['/dashboard/contacts', parsedContact.id]);
      }
    }
    this.themeService.themeSubject
      .pipe(takeUntilDestroyed())
      .subscribe((theme: string) => {
        this.theme = theme;
      });
  }

  onLogout() {
    this.authService.logout();
  }
}
