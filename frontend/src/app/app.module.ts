import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';

/**
 * Legacy root module for the ReqTrace application.
 * Note: This module is superseded by standalone components and is maintained for backward compatibility.
 * Configures browser platform, animations, forms, routing, and Material Design components.
 */
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    AppComponent,
    LoginComponent,
    ProfileComponent,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
