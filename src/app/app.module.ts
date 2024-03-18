import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { NgIf } from '@angular/common';
import { ContactListComponent } from './contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserDashboardComponent,
    HeaderComponent,
    ContactListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgIf,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
