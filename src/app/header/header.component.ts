import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

export interface User {
  name: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: User | null = null;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authSubscription = this.authService.authUser?.subscribe(
      (user: User | null) => {
        this.user = user;
      }
    );
  }
  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
