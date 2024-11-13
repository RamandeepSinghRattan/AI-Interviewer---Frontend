import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatabaseOperationsService } from './database-operations.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private dbService: DatabaseOperationsService) { }  // DI

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authToken = this.dbService.getToken(); 

    req = req.clone({
      setHeaders: {
        Authorization: "Bearer " + authToken
      }
    });
    return next.handle(req);
  }
}