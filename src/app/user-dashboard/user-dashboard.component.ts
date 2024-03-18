import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { ContactTypes, ContactsService } from '../contacts.service';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { SearchContactComponent } from '../search-contact/search-contact.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [ContactListComponent, SearchContactComponent, NgIf],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  currentContact: ContactTypes | null | undefined;

  private contactSubscription: Subscription | undefined;
  constructor(
    private authService: AuthService,
    private contactsService: ContactsService
  ) {}

  ngOnInit(): void {
    this.currentContact = this.contactsService.getSelectedContact();
    this.contactSubscription = this.contactsService.selectedContact$.subscribe(
      (contact) => {
        this.currentContact = contact;
      }
    );
  }
  ngOnDestroy(): void {
    this.contactSubscription?.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
