import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  @Output() backToLogin = new EventEmitter<void>();

  backToLoginPage() {
    this.backToLogin.emit(); // Informe le parent de revenir à la page de connexion
  } 

}
