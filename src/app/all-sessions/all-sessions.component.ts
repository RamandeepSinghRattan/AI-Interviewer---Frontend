import { Component } from '@angular/core';
import { DatabaseOperationsService } from '../services/database-operations.service';
import { Router } from '@angular/router';
import { AiCallsService } from '../services/ai-calls.service';

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html',
  styleUrl: './all-sessions.component.css'
})
export class AllSessionsComponent {

  constructor(private http: DatabaseOperationsService, private router: Router, private groqService: AiCallsService) { }

  userSessions?: any;

  ngOnInit() {
    this.http.getUserDetails().subscribe({
      next: (data) => {
        this.userSessions = data;
        // console.log(this.userSessions?.interviewSessions);

      },
      error: (err) => {
        console.log(err);

      }
    })
  }


  interviewStart() {
    this.router.navigate(['interviewSession']);
  }

  onSessionDeleted(sessionId: string) {
    this.userSessions.interviewSessions = this.userSessions.interviewSessions.filter(
      (session: any) => session.sessionId !== sessionId
    );
  }

}
