import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TERMINAL_URL } from '../../config';
import { Inject } from '@angular/core';
import { ICarItem } from '../models/caritem';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appstate';
import { AddCarItemAction, LoadCarItemsAction, RemoveCarItemAction } from '../store/caritemsreducer';
import { getState } from '../store/getState';
import { switchMap, map, tap } from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrchestrService {

  _baseUrl:string;
  constructor(private http: HttpClient, private store: Store<AppState>,
    @Inject(TERMINAL_URL) terminalUrl: string) {
      this._baseUrl = terminalUrl;   
       
     }

getCarItems() {


       this.store.select('filter').pipe(
           map (source=> 
            {
            let productId=source.product ? source.product.productId:'';
            let brand = source.brand||'';
        //    if (!productId) throw new Error("asdasd");
            return({productId ,brand})
            
            }),
           tap(value=>console.log('value is', value)),
        switchMap(value => this.http.get(`${this._baseUrl}api/caritems`,{params:value}))
        
       ).subscribe(
        (list:ICarItem[]) => {
          
          
          this.store.dispatch(new LoadCarItemsAction(list));}
          ,
          error =>console.log(error)
       );
               
       
      
       
    }

  add(item:ICarItem, callback: (item:any)=>void)
  {    
    this.http.post(`${this._baseUrl}api/caritems`, item).toPromise().then(
      
      (response:ICarItem) => {
      // add new user
      callback(null);
      this.store.dispatch(new AddCarItemAction(response));


  },error=>{ console.log(error) ; callback(error);}
  );
}

delete(id:number)
{   
  this.http.delete(`${this._baseUrl}api/caritems/${id}`).toPromise().then(result=>
   { 
     debugger;
    this.store.dispatch(new RemoveCarItemAction(id));
   }
  );
}
}
