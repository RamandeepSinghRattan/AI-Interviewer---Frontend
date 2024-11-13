import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatabaseOperationsService } from '../services/database-operations.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrl: './session-card.component.css'
})
export class SessionCardComponent {
  @Input()
  session:any;

  constructor(private http : DatabaseOperationsService, private snackBar : MatSnackBar){}

  deleteSession(event: Event, sessionId: any) {

    event.preventDefault();
    event.stopPropagation();

    this.http.deleteSession(sessionId).subscribe({
        next: (response) => {
            this.snackBar.open('Session is deleted', 'Close', { duration: 2000 });
            this.sessionDeleted.emit(sessionId);
          },
          error: (err) => {
            this.snackBar.open('Session is not deleted. Please try again ', 'Close', { duration: 2000 });
        }
    });
  }

  @Output() sessionDeleted = new EventEmitter<string>(); 
}
