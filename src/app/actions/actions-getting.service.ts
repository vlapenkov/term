import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appstate';
import { TERMINAL_URL } from 'src/app/config';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, tap, map } from 'rxjs/operators';
import { IDbAction } from './iDbAction';

/*
@Injectable({
  providedIn: 'root'
})
*/
export class ActionsGettingService {
  
  initResponse:IDbAction[] = [];

  subject = new BehaviorSubject<IDbAction[] >(this.initResponse);

  _baseUrl:string;
  constructor(private http: HttpClient,
    @Inject(TERMINAL_URL) terminalUrl: string) {
 
      this._baseUrl = terminalUrl;          
      this.setSearch(null);
     }


public setSearch(newSearchText:string):void{
  let url=`${this._baseUrl}api/dbactions`;
  
  if (newSearchText!=null && newSearchText.length>0) 
   url=`${this._baseUrl}api/dbactions?filter=${newSearchText}`;
  
 this.http.get<IDbAction[]>(url).pipe(debounceTime(300)).toPromise().then(res=>this.subject.next(res)).catch(e=> console.log('error handled',e))
 
 
}

public getResults():Observable<IDbAction[]>
{
 return  this.subject.asObservable();
}

getResult(id:number):Observable<IDbAction>
{
  const url =`${this._baseUrl}api/dbactions/${id}`;
  return this.http.get<IDbAction>(url)
}

}
