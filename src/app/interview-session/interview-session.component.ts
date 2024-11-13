import { ChangeDetectorRef, Component, Input, SimpleChanges } from '@angular/core';
import { Session } from '../models/Sessions';
import { ActivatedRoute, Router } from '@angular/router';
import { AiCallsService } from '../services/ai-calls.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseOperationsService } from '../services/database-operations.service';
import { MatSnackBar } from '@angular/material/snack-bar';


declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-interview-session',
  templateUrl: './interview-session.component.html',
  styleUrl: './interview-session.component.css'
})
export class InterviewSessionComponent {

  sessionData: any = {
    jobDescription: '',
    skills: [],
    experience: '',
    questionAnswers: []
  };

  sessionComplete = false;
  questions: string[] = [];
  currentQuestionIndex = 0;
  currentQuestion: string = '';
  interviewForm: FormGroup = this.fb.group({
    answer: ['', Validators.required]
  });

  constructor(private router: Router, private aiCall: AiCallsService, private fb: FormBuilder, private http: DatabaseOperationsService, private cdr: ChangeDetectorRef, private snackBar : MatSnackBar) {

    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state) {
      this.sessionData = { ...nav.extras.state['formData'], questionAnswers: [] };
    }
  }

  ngOnInit() {
    this.getNextQuestion();
  }

  async getNextQuestion() {


    const prompt = `
Please respond only with a single JSON array of objects, like this:
      [
        { "description": "What is the difference between == and .equals() methods in Java?", "type": "open-ended" },
        { "description": "Can you explain the concept of garbage collection in Java and how it works?", "type": "open-ended" },
        // more questions here
      ]
      For a candidate with job description :${this.sessionData.jobDescription}, skills: ${this.sessionData.skills.join(', ')} , and ${this.sessionData.experience} years of experience. Do not add any other text. Provide more than 30 
questions with equal weightage  first four question should be like greeting and asking question

    `;

    try {
      const data = await this.aiCall.getChatCompletion(prompt);


      const parsedData = JSON.parse(data);
      if (Array.isArray(parsedData)) {

        this.questions = parsedData.map((q: { description: string }) => q.description);
        this.currentQuestion = this.questions[this.currentQuestionIndex];
      } else {
        throw new Error("Parsed data is not an array");
      }
    } catch (error) {
      console.error("Error fetching or parsing questions:", error);
    }
  }

  feedback : string = '';

  getSessionFeedback() {
 
    const questionAnswerPairs = this.sessionData.questionAnswers
      .map((qa : any, index : number) => `Q${index + 1}: ${qa.question}\nA${index + 1}: ${qa.answer}`)
      .join('\n\n');

      // console.log(questionAnswerPairs);
    
    const feedbackPrompt = `
      Based on the following interview session, provide constructive feedback on the candidate's responses.
      
      Job Description: ${this.sessionData.jobDescription}
      Skills: ${this.sessionData.skills.join(', ')}
      Experience: ${this.sessionData.experience} years
      
      Interview Responses:
      ${questionAnswerPairs}
      
      Provide specific feedback on the strengths and areas for improvement in their answers. Provide feedback in a single paragraph
    `;
  
    this.aiCall.getChatCompletion(feedbackPrompt).then(data => {
      this.feedback = data; 
      console.log("feedback " + this.feedback);
      
    }).catch(error => {
      console.error("Error fetching feedback:", error);
    });
  }

  submitAnswer() {
    const answer = this.interviewForm.get('answer')?.value;
    if (answer) {
      this.sessionData.questionAnswers.push({ question: this.currentQuestion, answer });
      this.interviewForm.reset();
      this.nextQuestion();
    }
  }

  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.questions[this.currentQuestionIndex];
    } else {
      this.getSessionFeedback();      
      this.sessionComplete = true;
    }
  }

  saveSession() {

    this.http.saveSession(this.sessionData).subscribe({
      next: (response) => {
  
        this.snackBar.open('Session is saved', 'Close', { duration: 2000 });
        
        this.router.navigate(['sessions'])
      },
      error: (err) => {
        this.snackBar.open('Session is not saved', 'Close', { duration: 2000 });
        console.log(err);

      }
    })
  }

  retrySession() {
    this.router.navigate(['interviewSession']);
  }

  voice(){
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = "en-GB";

      recognition.onresult = (event: any) => {
          console.log(event.results[0][0].transcript);
          const transcript = event.results[0][0].transcript;
          this.interviewForm.get('answer')?.setValue(transcript); 
          this.cdr.detectChanges();
      };

      recognition.start();
  }
  }

}
