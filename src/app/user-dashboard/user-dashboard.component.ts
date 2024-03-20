import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactTypes, ContactsService } from '../contacts.service';
import { NgIf } from '@angular/common';
import { SearchContactComponent } from '../search-contact/search-contact.component';
import { Router, RouterOutlet } from '@angular/router';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [
    ContactListComponent,
    AddContactComponent,
    RouterOutlet,
    SearchContactComponent,
    NgIf,
  ],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    const savedContact = localStorage.getItem('selectedContact');
    if (savedContact) {
      const parsedContact: ContactTypes = JSON.parse(savedContact);
      if (parsedContact && parsedContact.id) {
        this.router.navigate(['/dashboard/contacts', parsedContact.id]);
      }
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
