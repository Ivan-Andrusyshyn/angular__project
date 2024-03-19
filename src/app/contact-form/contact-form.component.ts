import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactTypes } from '../contacts.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent {
  @Input() contact: ContactTypes | undefined;
  @Output() save: EventEmitter<void> = new EventEmitter<void>();

  onSave(): void {
    this.save.emit();
  }
}
