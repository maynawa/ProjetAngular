import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Import nécessaire pour les formulaires réactifs
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
   
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    LoginComponent, 
  ],
  providers: [],
//   bootstrap: []
})
export class AppModule { }
