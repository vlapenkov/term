import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
/*import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw'; */
import { filter, map, reduce, delay, first, tap, takeLast, debounceTime, catchError, take } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { TERMINAL_URL } from '../../config';

import { IProduct } from '../models/iProduct';



@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private _baseUrl: string = "";
  constructor(
    private http: HttpClient,
    @Inject(TERMINAL_URL) terminalUrl: string )
  {
    
    this._baseUrl = terminalUrl;   
    
  }




 getProducts(productId:string,exact:boolean=true): Observable<string> {
   let url= `${this._baseUrl}api/ProductsForAutocomplete/GetProductsByCodev2?term=${productId}&exact=${exact}}`;
   console.log(url);
    return this.http.get<IProduct[]>(url ).pipe(
      debounceTime(500),
      tap (x=> console.log(x)),
      map(x => x.length>=0 ? x[0].name:'')
            
      
    )
     
    }

    getOneProduct(productId:string): Observable<IProduct> {
      
      
      let url= `${this._baseUrl}api/ProductsForAutocomplete/GetProductsByCodev2?term=${productId}&exact=true`;
      
       return this.http.get<IProduct[]>(url ).pipe(       
        debounceTime(500),        
         map(x=>x[0]),
         
         tap (x=> console.log("getOneProduct", x)),
         catchError(error => { console.error(error);return empty()})
       );
        
       } 

    getAllProducts(productId:string): Observable<IProduct[]> {
      
      let url= `${this._baseUrl}api/ProductsForAutocomplete/GetProductsByCodev2?term=${productId}&exact=false`;
     // console.log(url);
       return this.http.get<IProduct[]>(url ).pipe(
       
                   debounceTime(500),
         tap (x=> console.log("getAllProducts", x)),
         catchError(error => { console.error(error);return empty()})
       );
        
       }
  }


