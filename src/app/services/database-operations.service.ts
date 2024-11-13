import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseOperationsService {

  constructor(private http : HttpClient) { }

  private apiUrl = 'http://localhost:8080/api/v1/';
  private crudUrl = 'http://localhost:8080/api/v2/'

  generateToken(data : any){
    return this.http.post(this.apiUrl + "/login", data );
  }

  login(token : any){
    sessionStorage.setItem("token", token);
    return true;
  }  

  getToken(){
    return sessionStorage.getItem("token");
  }


  getUserDetails(){
      return this.http.get(`${this.crudUrl}interview/userDetails`);
  }

  getSingleSession(id : any){
      return this.http.get(`${this.crudUrl}interview/session/${id}`)
  }

  registerUser(userData : any){
      return this.http.post(`${this.crudUrl}register`, userData);
  }

  saveSession(session : any){
    return this.http.post( `${this.crudUrl}interview/saveSession`, session);
  }

  deleteSession(sessionId : any){
    return this.http.delete(`${this.crudUrl}interview/deleteSession/${sessionId}`)
  }
}
