import { Routes } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { ContactSettingsComponent } from './pages/contact-settings/contact-settings.component';
import { ContactDetailComponent } from './pages/contact-detail/contact-detail.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { LoginComponent } from './pages/login/login.component';
import { AddContactComponent } from './pages/add-contact/add-contact.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    children: [
      { path: 'contacts/:id', component: ContactDetailComponent },
      { path: 'add-contact', component: AddContactComponent },
      { path: 'user-settings', component: UserSettingsComponent },
      { path: 'contact-settings', component: ContactSettingsComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
