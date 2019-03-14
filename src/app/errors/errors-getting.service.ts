import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appstate';
import { TERMINAL_URL } from 'src/app/config';
import { IErrorLog } from './ierrorlog';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, tap, map } from 'rxjs/operators';

/*
@Injectable({
  providedIn: 'root'
})
*/
export class ErrorsGettingService {
  
  initResponse:IErrorLog[] = [];

  subject = new BehaviorSubject<IErrorLog[] >(this.initResponse);

  _baseUrl:string;
  constructor(private http: HttpClient,
    @Inject(TERMINAL_URL) terminalUrl: string) {
 
      this._baseUrl = terminalUrl;          
      this.setSearch(null);
     }


public setSearch(newSearchText:string):void{
  let url=`${this._baseUrl}api/errors`;
  
  if (newSearchText!=null && newSearchText.length>0) 
   url=`${this._baseUrl}api/errors?filter=${newSearchText}`;
  
 this.http.get<IErrorLog[]>(url).pipe(debounceTime(300)).toPromise().then(res=>this.subject.next(res))
 /* .subscribe(
    res=> { this.subject.next(res); subscription.unsubscribe();}); */
 
}

public getResults():Observable<IErrorLog[]>
{
 return  this.subject.asObservable();
}

}
