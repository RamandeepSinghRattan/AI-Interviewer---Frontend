import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Groq from 'groq-sdk';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AiCallsService {
  private groq;

  constructor() {
 
    this.groq = new Groq({ 
      apiKey: environment.groqApiKey,
      dangerouslyAllowBrowser: true 
     });
  }


  async getChatCompletion(prompt: string): Promise<string> {
    try {
      const completion = await this.groq.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'llama3-8b-8192',
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      console.error('Error fetching chat completion:', error);
      throw error;
    }
  }


}
