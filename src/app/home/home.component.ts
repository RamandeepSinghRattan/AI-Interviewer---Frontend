import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor( private snackBar : MatSnackBar, private router : Router){}

  btnClicked(){
      this.router.navigate(['interviewSession'])
  }
}
