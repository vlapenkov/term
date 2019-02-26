import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { TERMINAL_URL } from 'src/app/config';
import { debounceTime, tap, map,take } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';
import { ICarModel } from '../models/carmodel';

@Injectable({
  providedIn: 'root'
})
export class PodborByAutoService {
 

  private _baseUrl: string = "";
  constructor(
    private http: HttpClient,
    @Inject(TERMINAL_URL) terminalUrl: string )
  {
    
    this._baseUrl = terminalUrl;   
    
  }

 public getAllBrands(): Observable<string[]> {
    let url= `${this._baseUrl}api/productsapi/getbrands`;
  //  console.log(url);
     return this.http.get<string[]>(url ).pipe(
       debounceTime(500),
  //     tap (x=> console.log(x)),
     )      
     }

     public getBrands(filterBrand:string)
     {
       filterBrand=filterBrand ||'';
      return this.getAllBrands().pipe(
        map(brands=>brands.filter(brand=>brand.toLowerCase().startsWith(filterBrand.toLowerCase()))));
     }

 public    getAllModels(brand:string): Observable<ICarModel[]> {
      let url= `${this._baseUrl}api/productsapi/getmodels?brand=${brand}`;
      console.log(url);
       return this.http.get<ICarModel[]>(url ).pipe(
         debounceTime(500),
  //       tap (x=> console.log(x)),
       )      
       }


       public    getModels(/*callback: () => string, */brand:string,filterModel:string): Observable<ICarModel[]> {
         
        // let brand=callback();
         
        filterModel=filterModel ||'';
     return  this.getAllModels(brand).pipe(
        map(models=>
          
          {
            if(filterModel)
          return models.filter(model=>model.name.toLowerCase().startsWith(filterModel.toLowerCase()))
          else
          return models
          }
          ));
        }

       
         }

