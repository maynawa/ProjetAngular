import { Component } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';  // Importation de LoginComponent
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [CommonModule, RouterModule, LoginComponent, ForgotPasswordComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'mon-projet-angular';
  showLogin = true;
  showIns = true;

  toggleView() {
    this.showLogin = !this.showLogin;  // Change la vue
  }
  // redirect() {
  //   this.showIns = !this.showIns;
  // }
}
