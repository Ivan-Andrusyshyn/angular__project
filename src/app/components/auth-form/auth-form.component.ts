import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.css',
})
export class AuthFormComponent implements OnInit {
  authForm: FormGroup;

  @Input() componentName: 'Registration' | 'Login' | 'Changing' | undefined;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  isRegistration: boolean = false;
  isChanging: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.authForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.isRegistration = this.componentName === 'Registration';
    this.isChanging = this.componentName === 'Changing';
    const currentUserData = this.authService.authUser.value;
    if (!this.isRegistration && !this.isChanging) {
      this.authForm = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
    } else if (this.isChanging && currentUserData) {
      this.authForm.patchValue(currentUserData);
    }
  }

  onAuth() {
    console.log(this.authForm.value);

    this.onSubmit.emit(this.authForm?.value);
  }
}
