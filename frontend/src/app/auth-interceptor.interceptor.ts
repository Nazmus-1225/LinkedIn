import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem('access_token');

    // Clone the request if the access token is available
    if (accessToken) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Pass the cloned request to the next handler
      return next.handle(clonedRequest);
    } else {
      // If the access token is not available, continue with the original request
      return next.handle(req);
    }
  }
}
