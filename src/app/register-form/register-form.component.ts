import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseOperationsService } from '../services/database-operations.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {


  
  private emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  constructor(private router: Router, private http: DatabaseOperationsService, private fb: FormBuilder) { }

  registerForm: FormGroup = this.fb.group({
    fullName: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z ]*$')  
    ]],
    age: ['', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.min(15)
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.pattern(this.passwordPattern)
     
    ]]
  });

  submit() {
      this.http.registerUser(this.registerForm.value).subscribe({
        next : (response) =>{
          console.log(response);
          
        },
        error : (err) =>{
          console.log(err);
          
        }
      })
  }



}