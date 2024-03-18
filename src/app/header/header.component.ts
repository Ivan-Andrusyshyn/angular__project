import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

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
export class HeaderComponent implements OnInit {
  user: User | null = null;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.authUser?.subscribe((user: User | null) => {
      this.user = user;
    });
  }
}
