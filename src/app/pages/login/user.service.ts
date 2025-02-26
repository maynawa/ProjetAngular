import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Disponible globalement dans l'application
})
export class UserService {
  private apiUrl = 'http://localhost/backends/login.php'; // Change l'URL selon ton backend

  constructor(private http: HttpClient) {
    console.log("UserService initialisé !");
  }

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
