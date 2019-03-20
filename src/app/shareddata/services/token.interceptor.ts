import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';


import { Router } from '@angular/router';
import { Observable, of, empty, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  

    let relativeUrl = this.router.url; 

  if( request.url.includes('login')) return next.handle(request.clone());

 // if( !request.url.includes('caritems')) return next.handle(request.clone());
  

    let token = localStorage.getItem('auth_token')
    if (token != null) {

      const requestCloned = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });      
      return next.handle(requestCloned).pipe(
        tap (()=>{console.log('interceptor success')}, err => {
            //debugger;
            if (err.status === 401)
              {this.router.navigate(['login'], { queryParams: { redirectToUrl: relativeUrl } });
return empty();
        }
            else {
             return throwError(err);              
             // console.log('error on get drivers in TokenInterceptor');
            }
              
          })
              );


    } 
    else { this.router.navigate(['login'], { queryParams: { redirectToUrl: relativeUrl } }) }
  }
   
}