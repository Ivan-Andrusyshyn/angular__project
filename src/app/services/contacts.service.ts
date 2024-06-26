import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { contactList } from '../utils/contactList';
import { ContactTypes } from '../models/ContactInterface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private selectedContactSubject: BehaviorSubject<ContactTypes | null> =
    new BehaviorSubject<ContactTypes | null>(null);

  selectedContact$: Observable<ContactTypes | null> =
    this.selectedContactSubject.asObservable();

  contacts: ContactTypes[] = contactList;

  filteredContacts$: BehaviorSubject<ContactTypes[]> = new BehaviorSubject<
    ContactTypes[]
  >([]);
  filteredContacts: ContactTypes[] = [];
  private readonly CONTACTS_KEY = `${this.authService.authUser.value?.id} `;

  constructor(private authService: AuthService) {
    const savedContact = localStorage.getItem('selectedContact');
    if (!this.CONTACTS_KEY) return;
    const savedContacts = localStorage.getItem(this.CONTACTS_KEY);
    if (savedContact && savedContacts) {
      this.contacts = JSON.parse(savedContacts);
      this.selectedContactSubject.next(JSON.parse(savedContact));
    } else {
      this.contacts = contactList;
      this.saveContacts();
    }
    this.updateFilteredContacts();
  }

  private saveContacts(): void {
    if (!this.CONTACTS_KEY) return;
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(this.contacts));
  }

  private updateFilteredContacts(): void {
    this.filteredContacts = [...this.contacts];
    this.filteredContacts$.next(this.filteredContacts);
  }

  deleteContactById(contactId: number): void {
    this.contacts = this.contacts.filter((contact) => contact.id !== contactId);
    this.updateFilteredContacts();
    localStorage.setItem(this.CONTACTS_KEY, JSON.stringify(this.contacts));
    this.setSelectedContact(null);
  }

  blockContactById(contactId: number): void {
    const contact = this.contacts.find((c) => c.id === contactId);
    if (contact) {
      contact.isBlocked = true;
      this.setSelectedContact(contact);
      this.saveContacts();
    }
  }

  unblockContactById(contactId: number): void {
    const contact = this.contacts.find((c) => c.id === contactId);
    if (contact) {
      contact.isBlocked = false;
      this.setSelectedContact(contact);
      this.saveContacts();
    }
  }

  searchContacts(query: string): void {
    query = query.toLowerCase();
    this.filteredContacts = this.contacts.filter((contact) =>
      contact.firstName.toLowerCase().includes(query)
    );
    this.filteredContacts$.next(this.filteredContacts);
  }

  updateContact(contact: ContactTypes | undefined): void {
    if (!contact) return;

    const index = this.contacts.findIndex((c) => c.id === contact.id);
    if (index !== -1) {
      this.contacts[index] = contact;
      this.saveContacts();
      this.setSelectedContact(contact);
      this.updateFilteredContacts();
    }
  }

  addContact(contact: ContactTypes | undefined): void {
    if (!contact) return;
    const isDuplicateContact = this.contacts.some(
      (c) =>
        c.firstName === contact.firstName && c.lastName === contact.lastName
    );

    if (isDuplicateContact) {
      alert('You have the same contact.');
      return;
    }

    this.contacts.push(contact);
    this.setSelectedContact(contact);
    this.saveContacts();

    this.updateFilteredContacts();
  }

  setSelectedContact(contact: ContactTypes | null): void {
    this.selectedContactSubject.next(contact);
    localStorage.setItem('selectedContact', JSON.stringify(contact));
  }

  getSelectedContact(): ContactTypes | null {
    return this.selectedContactSubject.getValue();
  }
}
