import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // Ajoute CommonModule ici
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { UserService } from './user.service';


@NgModule({

  declarations : [
    
  ],
   
  imports: [
    CommonModule,  
     ReactiveFormsModule,
    
  ],

})
export class LoginModule { }
