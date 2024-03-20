import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { contactList } from './utils/contactList';

export interface ContactTypes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  description: string;
  company: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private selectedContactSubject: BehaviorSubject<ContactTypes | null> =
    new BehaviorSubject<ContactTypes | null>(null);

  selectedContact$: Observable<ContactTypes | null> =
    this.selectedContactSubject.asObservable();

  contacts: ContactTypes[] = contactList;

  filteredContacts: ContactTypes[] = [];

  filteredContacts$: BehaviorSubject<ContactTypes[]> = new BehaviorSubject<
    ContactTypes[]
  >([]);

  constructor() {
    const savedContact = localStorage.getItem('selectedContact');
    if (savedContact) {
      this.selectedContactSubject.next(JSON.parse(savedContact));
    }
    this.updateFilteredContacts();
  }

  private updateFilteredContacts(): void {
    this.filteredContacts = [...this.contacts];
    this.filteredContacts$.next(this.filteredContacts);
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

    contact.id = this.getNextId();
    this.contacts.push(contact);
    this.updateFilteredContacts();
  }

  setSelectedContact(contact: ContactTypes): void {
    this.selectedContactSubject.next(contact);
    localStorage.setItem('selectedContact', JSON.stringify(contact));
  }

  getSelectedContact(): ContactTypes | null {
    return this.selectedContactSubject.getValue();
  }

  private getNextId(): number {
    const maxId = Math.max(...this.contacts.map((contact) => contact.id), 0);
    return maxId + 1;
  }
}
