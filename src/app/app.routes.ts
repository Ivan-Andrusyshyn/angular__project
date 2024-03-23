import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ContactSettingsComponent } from './contact-settings/contact-settings.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    children: [
      { path: 'contacts/:id', component: ContactDetailComponent },
      { path: 'add-contact', component: ContactFormComponent },
      { path: 'user-settings', component: UserSettingsComponent },
      { path: 'contact-settings', component: ContactSettingsComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
