import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ContactsService } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactTypes } from '../models/ContactInterface';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit, OnDestroy {
  @Input() contact: ContactTypes | undefined;
  @Output() save: EventEmitter<ContactTypes> = new EventEmitter<ContactTypes>();
  @Output() toggleEditMode: EventEmitter<void> = new EventEmitter<void>();

  isAddContactRoute: boolean = false;
  fieldsContact: ContactTypes = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    description: '',
    company: '',
    isBlocked: false,
  };
  private routeSubscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.url.subscribe((segments) => {
      this.isAddContactRoute = segments[0]?.path === 'add-contact';
      if (!this.isAddContactRoute && this.contact) {
        this.fieldsContact = { ...this.contact };
      }
    });
  }

  getNextId(): number {
    const maxId = Math.max(
      ...this.contactService.contacts.map((contact) => contact.id),
      0
    );
    return maxId + 1;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  isNameFieldEmpty(): boolean {
    return this.fieldsContact.firstName.trim() === '';
  }

  onSave(): void {
    if (this.isNameFieldEmpty()) return;
    if (this.isAddContactRoute) {
      this.fieldsContact.id = this.getNextId();
      this.contactService.addContact(this.fieldsContact);
      this.router.navigate(['/dashboard/contacts', this.fieldsContact.id]);
    } else {
      this.save.emit(this.fieldsContact);
    }
  }

  onCancel(): void {
    if (!this.contact) {
      this.location.back();
      this.save.emit();
    } else {
      this.toggleEditMode.emit();
    }
  }
}
