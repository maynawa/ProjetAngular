import { Component } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';  // Importation de LoginComponent
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [LoginComponent, CommonModule, RouterModule,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'mon-projet-angular';
}
