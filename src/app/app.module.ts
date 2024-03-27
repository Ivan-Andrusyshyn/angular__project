import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { NgIf } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgIf,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
