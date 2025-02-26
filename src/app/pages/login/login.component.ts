import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private http:HttpClient, private router: Router) {
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
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const formData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.http.post('http://localhost:8080/login.php', formData, {headers}).subscribe(
        (response: any) => {
          if (response.success === true) {
            //rediriger vers la page d'accueil
            localStorage.setItem('user', JSON.stringify(response.user));
            console.log("Réponse reçue", response);
            alert("Connexion réussie")
            this.signupForm.reset();
          } else {
            alert(response.message);
          }
        },
        (error: any) => {
          console.error("Erreur lors de la connexion", error);
        }
      );
    } else {
      alert('Erreur de connexion au serveur');
    }
  }

  onSignup() {
    if (this.signupForm.valid) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const formData = {
        prenom: this.signupForm.value.prenom,
        nom: this.signupForm.value.nom,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        jour: this.signupForm.value.jour,
        mois: this.signupForm.value.mois,
        annee: this.signupForm.value.annee,
        sexe: this.signupForm.value.sexe
      };

      this.http.post('http://localhost:8080/register.php', formData, {headers}).subscribe(
        (response: any) => {
          console.log(response)
          if (response.success === true) {
            //rediriger vers la page de connexion
            console.log("Réponse reçue", response);
            alert("Inscription réussie")
            this.signupForm.reset();
          } else {
            alert(response.message);
          }
        },
        (error: any) => {
          console.error("Erreur lors de l'inscriptionss", error);
        }
      );
    } else {
      alert('Erreur de connexion au serveur');
    }
  }
  
  forgotPassword() {
    this.router.navigate(["forgot-password"])
  }

}
