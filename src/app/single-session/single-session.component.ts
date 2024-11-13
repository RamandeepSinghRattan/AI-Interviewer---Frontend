import { Component } from '@angular/core';
import { DatabaseOperationsService } from '../services/database-operations.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-session',
  templateUrl: './single-session.component.html',
  styleUrl: './single-session.component.css'
})
export class SingleSessionComponent {
  constructor(private http : DatabaseOperationsService, private ac : ActivatedRoute){}

  sessionDetails : any;

  ngOnInit(){
    this.ac.paramMap.subscribe({
      next : (id) =>{
        let sessionId = id.get("sessionId") ?? 0;
        // console.log(sessionId);
    

        this.http.getSingleSession(sessionId).subscribe({
          next: (response)=>{
            this.sessionDetails = response;
            // console.log(response);
            
          }
        })
        
      }
    })
  }
}
