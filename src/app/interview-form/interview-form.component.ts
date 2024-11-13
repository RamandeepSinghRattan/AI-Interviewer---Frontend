import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrl: './interview-form.component.css'
})
export class InterviewFormComponent {
  myForm: FormGroup = this.fb.group({
    jobRole : ['', [Validators.required]],
    jobDescription: ['', [Validators.required]],
    skills: ['', [Validators.required]],
    experience: ['', [Validators.required]]
  });

  constructor(private router: Router, private fb: FormBuilder) {}


  startSession() {
    if (this.myForm.valid) {
 
      const formData = {
        ...this.myForm.value,
        skills: (this.myForm.value.skills as string).split(',').map((skill: string) => skill.trim())
      };

      this.router.navigate(['/interview-questions'], { state: { formData } });
    }
  }
}
