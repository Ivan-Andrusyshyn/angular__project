import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ContactTypes } from '../../models/ContactInterface';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent implements OnInit {
  @Input() contact: ContactTypes | undefined;
  @Output() save: EventEmitter<ContactTypes> = new EventEmitter<ContactTypes>();
  @Output() toggleEditMode: EventEmitter<void> = new EventEmitter<void>();

  destroyRef = inject(DestroyRef);

  isAddContactRoute: boolean = false;
  contactForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactsService,
    private router: Router,
    private fb: FormBuilder,
    private location: Location
  ) {
    this.contactForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.route.url
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((segments) => {
        this.isAddContactRoute = segments[0]?.path === 'add-contact';
        if (!this.isAddContactRoute && this.contact) {
          this.contactForm.patchValue(this.contact);
        }
      });
  }

  createContactForm(): FormGroup {
    return this.fb.group({
      id: [0],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: [''],
      phoneNumber: [''],
      description: [''],
      company: [''],
      isBlocked: [false],
    });
  }

  getNextId(): number {
    const maxId = Math.max(
      ...this.contactService.contacts.map((contact) => contact.id),
      0
    );
    return maxId + 1;
  }

  isNameFieldEmpty(): boolean {
    return this.contactForm.value.firstName.trim() === '';
  }

  onSave(): void {
    if (this.isNameFieldEmpty()) return;
    if (this.isAddContactRoute) {
      this.contactForm.value.id = this.getNextId();
      this.contactService.addContact(this.contactForm.value);
      this.router.navigate(['/dashboard/contacts', this.contactForm.value.id]);
    } else {
      this.save.emit(this.contactForm.value);
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
