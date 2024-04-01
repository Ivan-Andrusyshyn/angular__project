import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';

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
