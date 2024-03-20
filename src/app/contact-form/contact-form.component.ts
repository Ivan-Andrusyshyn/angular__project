import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ContactsService, ContactTypes } from '../contacts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

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
  };
  private routeSubscription: Subscription | undefined;
  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.url.subscribe((segments) => {
      this.isAddContactRoute = segments[0]?.path === 'add-contact';
      if (!this.isAddContactRoute && this.contact) {
        this.fieldsContact = { ...this.contact };
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  onSave(): void {
    if (this.isAddContactRoute) {
      this.contactService.addContact(this.fieldsContact);
    } else {
      this.save.emit(this.fieldsContact);
    }
  }

  onCancel(): void {
    if (!this.contact) {
      this.router.navigate(['/dashboard']);
      this.save.emit();
    } else {
      this.toggleEditMode.emit();
    }
  }
}
