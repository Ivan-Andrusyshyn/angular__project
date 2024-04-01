import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ContactsService } from '../../services/contacts.service';
import { ContactTypes } from '../../models/ContactInterface';

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
