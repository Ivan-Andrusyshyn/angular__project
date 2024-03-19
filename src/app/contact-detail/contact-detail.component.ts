import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService, ContactTypes } from '../contacts.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [NgIf, FormsModule, ContactFormComponent],
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
})
export class ContactDetailComponent implements OnInit, OnDestroy {
  contact: ContactTypes | undefined;
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

  saveChanges(): void {
    this.contactsService.updateContact(this.contact);
    this.editMode = false;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.contact = this.contactsService.contacts.find(
          (contact) => contact.id === id
        );
      }
    });
  }
  ngOnDestroy(): void {
    this.contactSubscription?.unsubscribe();
  }
}
