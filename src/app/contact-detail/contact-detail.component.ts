import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService, ContactTypes } from '../contacts.service';
import { Subscription } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [NgIf, NgClass, FormsModule, ContactFormComponent],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  contact: ContactTypes | undefined | null;
  currentContact: ContactTypes | null | undefined;
  editMode: boolean = false;

  private contactSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService
  ) {}

  toggleEditMode(): void {
    this.editMode = !this.editMode;
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

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.contactSubscription =
          this.contactsService.selectedContact$.subscribe((selectedContact) => {
            this.contact = selectedContact;
          });
      }
    });
  }
  ngOnDestroy(): void {
    this.contactSubscription?.unsubscribe();
  }
}
