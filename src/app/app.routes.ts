import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {LoginComponent} from './pages/login/login.component'
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo:'forgot-password', pathMatch: 'full'},
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent }
  ];