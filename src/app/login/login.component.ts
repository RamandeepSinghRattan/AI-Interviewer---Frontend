import { Component } from '@angular/core';
import { DatabaseOperationsService } from '../services/database-operations.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckLoginService } from '../services/check-login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private http : DatabaseOperationsService, private router : Router, private fb : FormBuilder, private checkLogin : CheckLoginService, private snackBar : MatSnackBar){}

  myForm: FormGroup = this.fb.group({
    email : ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required]]
  })
  
  login(){

    this.http.generateToken(this.myForm.value).subscribe({
      next : (response : any)=>{
        
        const token = response.token;
        this.http.login(token);
        
        this.checkLogin.login();
        this.router.navigate(['sessions'])
        this.snackBar.open('Login successful', 'Close', { duration: 2000 });
        
      },
      error : (error)=>{
        this.snackBar.open('Please provide valid credentials', 'Close', { duration: 2000 });

    }
    })
  }

}
