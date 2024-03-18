import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ContactTypes, ContactsService } from '../contacts.service';

@Component({
  selector: 'app-search-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-contact.component.html',
  styleUrl: './search-contact.component.css',
})
export class SearchContactComponent {
  searchQuery: string = '';

  constructor(private contactsService: ContactsService) {}

  searchContacts(): void {
    this.contactsService.searchContacts(this.searchQuery);
  }
}
