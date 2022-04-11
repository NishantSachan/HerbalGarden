import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';

const userRoutes:Routes=[
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent
   
  ],

  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(userRoutes)
  ]
})
export class AuthModule { }
