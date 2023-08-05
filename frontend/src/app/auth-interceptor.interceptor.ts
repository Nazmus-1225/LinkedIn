import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();

    // Clone the request and add the JWT token to the request body
    const authRequest = request.clone({
      body: { ...request.body, token: authToken }
    });

    // Pass the modified request to the next interceptor in the chain, or to the server if there are no more interceptors
    return next.handle(authRequest);
  }
}
