import { Injectable, Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { TERMINAL_URL } from 'src/app/config';
import { AppState } from 'src/app/appstate';
import { map, catchError, tap } from 'rxjs/operators';
import { ILoginData } from '../models/iloginresponse';
import { LoginActionTypes, SetLoginAction } from '../store/loginreducer';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public token: string;
  public _loggedIn: boolean = false;
  public _userName: string;
  
  private static httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      //  'Authorization': 'my-auth-token'
    })
  };
  
  _baseUrl:string;
  constructor(private http: HttpClient, private store: Store<AppState>,
    @Inject(TERMINAL_URL) terminalUrl: string) {
      this._baseUrl = terminalUrl;   
       
     }


     /*
     handleError(error: HttpErrorResponse) {
     }
     */
     login2(username: string, password: string): Observable<boolean> {
      return this.http.post<ILoginData>(`${this._baseUrl}api/account/login`, {username,password} , AuthenticationService.httpOptions).pipe(
        catchError(error=> { console.log('error'); return of(null) }),
        map (response=>
         {           
           if(response)
          { this.token = response.access_token;
           this._loggedIn = true;
           this._userName = username;
           localStorage.setItem('auth_token', this.token);
           this.store.dispatch(new SetLoginAction(response)) 
          }        
          return response
        },
      
          ));
     }
  
  

  login(username: string, password: string): Observable<boolean> {
    
    return this.http.post<ILoginData>(`${this._baseUrl}api/account/login`, {username,password} /*JSON.stringify({ username: username, password: password })*/, AuthenticationService.httpOptions).pipe(
      map (response=>
       { let token = response.access_token;
        debugger;
        if (token) {
          // set token property
          this.token = token;
          this._loggedIn = true;
          this._userName = username;
          // store username and jwt token in local storage to keep user logged in between page refreshes
       
          localStorage.setItem('auth_token', token);

          this.store.dispatch(new SetLoginAction(response))
        } else {
          this._userName = null;
        }
        return !!token;
      },
      catchError(val =>{console.log(val); return  of(false)})
        ));
    
  }

  logout() {
    localStorage.removeItem('auth_token');
    this._loggedIn = false;    
    this._userName = null;
  //  EmitterService.get("username_id").emit(null);
  }
  isLoggedIn() {
    return this._loggedIn;
  }
}
