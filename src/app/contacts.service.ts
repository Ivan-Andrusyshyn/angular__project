import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { contactList } from './utils/contactList';

export interface ContactTypes {
  id: number;
  firstName: string;
  secondName: string;
  email: string;
  phoneNumber: number;
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
    console.log(query);
    this.filteredContacts$.next(this.filteredContacts);
  }

  setSelectedContact(contact: ContactTypes): void {
    this.selectedContactSubject.next(contact);
    localStorage.setItem('selectedContact', JSON.stringify(contact));
  }

  getSelectedContact(): ContactTypes | null {
    return this.selectedContactSubject.getValue();
  }
}
