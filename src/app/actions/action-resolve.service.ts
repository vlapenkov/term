import { Injectable } from '@angular/core';
import { IDbAction } from './iDbAction';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActionsGettingService } from './actions-getting.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActionResolveService implements Resolve<IDbAction | null> {

  constructor(private _service:ActionsGettingService, private _router:Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDbAction | null>  
  {
    console.log(route.params.id);

   return this._service.getResult(route.params.id).pipe(
     tap(x=>console.log(x)),
map(x=> {if(!x) throw new Error ("result is null"); else return x; }),
catchError(error=> {
  debugger;
  this._router.navigate(['actions']);  
return of(null) })
);

  }


}
