import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
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
  userService: any;

  constructor(private fb: FormBuilder, private http:HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: ['']
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

  emailMatchValidator = (control: AbstractControl) => {
    const email = control.get('email')?.value;
    const emailConf = control.get('emailConf')?.value;
    if (email && emailConf && email !== emailConf) {
      return { emailMismatch: true };
    }
    return null;
  };

  dateValidator = (control: AbstractControl) => {
    const jour = control.get('jour')?.value;
    const mois = control.get('mois')?.value;
    const annee = control.get('annee')?.value;
    if (!jour || !mois || !annee) {
      return { dateIncomplete: true };
    }
    return null;
  };

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Connexion réussie', this.loginForm.value);
    } else {
      console.log('Erreur: Formulaire de connexion invalide');
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
      this.http.post('http://localhost/backends/login.php', this.signupForm.value).subscribe(
        (response: any) => {
          console.log("Réponse reçue", response);
        },
        (error: any) => {
          console.error("Erreur lors de l'inscription", error);
        }
      );
    } else {
      console.log("Formulaire invalide ❌", this.signupForm.errors);
    }
  }
  
}
