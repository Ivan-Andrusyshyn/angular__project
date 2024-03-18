import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactTypes, ContactsService } from '../contacts.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit, OnDestroy {
  contactList: ContactTypes[] = [];
  private contactsSubscription: Subscription | undefined;

  constructor(private contactsService: ContactsService) {}

  ngOnInit(): void {
    this.contactList = this.contactsService.filteredContacts;
    this.contactsSubscription =
      this.contactsService.filteredContacts$.subscribe((filteredContacts) => {
        this.contactList = filteredContacts;
      });
  }

  ngOnDestroy(): void {
    if (this.contactsSubscription) {
      this.contactsSubscription.unsubscribe();
    }
  }

  onContactClick(contact: ContactTypes): void {
    this.contactsService.setSelectedContact(contact);
  }
}
