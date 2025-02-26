import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component'; // ✅ Import du composant standalone
import { LoginComponent } from './pages/login/login.component';

bootstrapApplication(AppComponent, {
  providers: [HttpClient]
}).catch(err => console.error(err));
