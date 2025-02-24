import { Component } from '@angular/core';
import { LoginComponent } from './pages/login/login.component';  // Importation de LoginComponent

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'mon-projet-angular';
}
