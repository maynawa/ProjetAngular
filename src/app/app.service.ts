import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // ✅ Vérifie que c'est bien importé

@Injectable({
  providedIn: 'root'
})
export class MonService {
  constructor(private http: HttpClient) { } // ✅ Vérifie que c'est bien injecté

  getData() {
    return this.http.get('http://localhost/api/data'); 
  }
}
