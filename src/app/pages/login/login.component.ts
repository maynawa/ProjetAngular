import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
 loginForm: FormGroup;
  signupForm: FormGroup;

  jours: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  mois = [
    { nom: 'Jan', valeur: 1 }, { nom: 'Fév', valeur: 2 }, { nom: 'Mar', valeur: 3 },
    { nom: 'Avr', valeur: 4 }, { nom: 'Mai', valeur: 5 }, { nom: 'Juin', valeur: 6 },
    { nom: 'Juil', valeur: 7 }, { nom: 'Août', valeur: 8 }, { nom: 'Sep', valeur: 9 },
    { nom: 'Oct', valeur: 10 }, { nom: 'Nov', valeur: 11 }, { nom: 'Déc', valeur: 12 }
  ];
  annees: number[] = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    this.signupForm = this.fb.group(
      {
        prenom: ['', Validators.required],
        nom: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        emailConf: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        jour: ['', Validators.required],
        mois: ['', Validators.required],
        annee: ['', Validators.required],
        sexe: ['', Validators.required]
      },
      { validators: [this.emailMatchValidator, this.dateValidator] }
    );
  }

  emailMatchValidator(control: AbstractControl) {
    return control.get('email')?.value === control.get('emailConf')?.value ? null : { emailMismatch: true };
  }

  dateValidator(control: AbstractControl) {
    return control.get('jour')?.value && control.get('mois')?.value && control.get('annee')?.value
      ? null
      : { dateIncomplete: true };
  }

  onLogin() {
    if (this.loginForm.valid) console.log('Connexion réussie', this.loginForm.value);
  }

  onSignup() {
    if (this.signupForm.valid) console.log('Inscription réussie', this.signupForm.value);
  }
  
}
