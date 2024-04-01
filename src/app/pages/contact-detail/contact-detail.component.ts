import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ContactFormComponent } from '../../components/contact-form/contact-form.component';
import { ContactTypes } from '../../models/ContactInterface';
import { SettingsService } from '../../services/settings.service';
import { ContactsService } from '../../services/contacts.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, ContactFormComponent],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit {
  contact: ContactTypes | undefined | null;
  currentContact: ContactTypes | null | undefined;
  editMode: boolean = false;
  showDeleteForm: boolean = false;
  destroyRef = inject(DestroyRef);
  theme = 'light';
  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router,
    public settingsService: SettingsService,
    private themeService: ThemeService
  ) {
    this.themeService.themeSubject
      .pipe(takeUntilDestroyed())
      .subscribe((theme: string) => {
        this.theme = theme;
      });
  }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = Number(params.get('id'));
        if (!id) return;
        this.contactsService.selectedContact$.subscribe((selectedContact) => {
          this.contact = selectedContact;
        });
      });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  deleteContact() {
    if (!this.contact) return;
    this.contactsService.deleteContactById(this.contact.id);
    this.router.navigate(['/dashboard']);
  }

  showDeleteContactForm() {
    this.showDeleteForm = true;
  }
  cancelDeleteContact() {
    this.showDeleteForm = false;
  }

  saveChanges(updateContact: ContactTypes): void {
    this.editMode = false;
    if (!this.contact) return;
    this.contactsService.updateContact(updateContact);
    this.contact = updateContact;
  }

  blockContact(): void {
    if (!this.contact) return;
    this.contactsService.blockContactById(this.contact.id);
    this.contact.isBlocked = true;
  }

  unblockContact(): void {
    if (!this.contact) return;
    this.contactsService.unblockContactById(this.contact.id);
    this.contact.isBlocked = false;
  }
}
