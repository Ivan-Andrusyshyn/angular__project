import { Component } from '@angular/core';
import { ContactsService } from '../../contacts.service';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ContactTypes } from '../../models/ContactInterface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../theme.service';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, RouterLinkActive],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent {
  contactList: ContactTypes[] = [];
  constructor(private contactsService: ContactsService) {
    this.contactList = this.contactsService.filteredContacts;
    this.contactsService.filteredContacts$.subscribe((filteredContacts) => {
      this.contactList = filteredContacts;
    });
  }

  onContactClick(contact: ContactTypes): void {
    this.contactsService.setSelectedContact(contact);
  }
}
