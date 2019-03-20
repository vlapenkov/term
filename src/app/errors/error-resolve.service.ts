import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';
import { IErrorLog } from './ierrorlog';
import { ErrorsGettingService } from './errors-getting.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorResolveService implements Resolve<IErrorLog | null> {

  constructor(private _service:ErrorsGettingService, private _router:Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IErrorLog | null>  
  {
    console.log(route.params.id);

   return this._service.getResult(route.params.id).pipe(
     tap(x=>console.log(x)),
map(x=> {if(!x) throw new Error ("result is null"); else return x; }),
catchError(error=> {
  debugger;
  this._router.navigate(['errors']);  
return of(null) })
);

  }


}
