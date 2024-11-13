import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckLoginService } from '../services/check-login.service';
import { DatabaseOperationsService } from '../services/database-operations.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLogin: boolean = false;
  userName?:string;

  constructor(private router: Router, private checkLogin: CheckLoginService, private dbOperation: DatabaseOperationsService, private snackBar : MatSnackBar) { }

  ngOnInit(){
    this.checkLogin.loggedIn$.subscribe((data)=>{
      this.isLogin = data;

    })
  }

  logout(){
    this.checkLogin.logout();
    this.router.navigate(['']);
  }

  clicked(){
    this.snackBar.open('Please Login to create a session', 'Close', { duration: 2000 });
  }
}
