import { Component } from '@angular/core';
import { ContactTypes } from '../../models/ContactInterface';
import { ContactsService } from '../../contacts.service';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [ContactFormComponent],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css',
})
export class AddContactComponent {
  contact: ContactTypes | undefined | null;
  constructor(private contactsService: ContactsService) {}
}
