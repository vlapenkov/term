import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { ProductService } from '../../shared/services/productbyid.service';
import { PodborByAutoService } from '../../shared/services/podbor-by-auto.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap, map, first, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appstate';
import { SetFilterAction } from 'src/app/shared/store/caritemsfilterreducer';
import { ICarItemsFilter } from 'src/app/shared/models/ICarItemsFilter';
import { of } from 'rxjs';
import { IProduct } from 'src/app/shared/models/iProduct';
import { ICarItem } from 'src/app/shared/models/caritem';

@Component({
  selector: 'app-filter-cartitem',
  templateUrl: './filter-cartitem.component.html',
  styleUrls: ['./filter-cartitem.component.css']
})
export class FilterCartitemComponent implements OnInit {

  input :HTMLInputElement;
  _filteredproducts$ :Observable<IProduct[]>;
  _brands$ : Observable<string[]>;
   searchByProductId:FormControl;  
   searchByBrand:FormControl;  
  
  constructor(private service: ProductService, private podborService: PodborByAutoService, private store: Store<AppState>) {
    this.searchByProductId = new FormControl()
    this.searchByBrand = new FormControl()
  }

  initValues(currentFilter: ICarItem): void {
    this.searchByProductId.setValue(currentFilter.product);
    this.searchByBrand.setValue(currentFilter.brand);
    }
  
  ngOnInit() {
    this.store.select('filter').subscribe(currentFilter=>this.initValues(currentFilter));
/*
  let filter$=this.store.select('filter');
   filter$.pipe(
    //tap(x=>console.log('action1 productid is', x.productId)),
    mergeMap( filter => 

     this.service.getOneProduct(filter.productId)),
     
  
    
      
   ).subscribe( result =>  this.initValues(result),
   error=>console.log(error)
   );//.unsubscribe();
*/
   

    this._filteredproducts$ = this.searchByProductId.valueChanges.pipe(  
      tap(x=>console.log(x)),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.service.getAllProducts(value)));
      
      this._brands$ = this.searchByBrand.valueChanges.pipe(  
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(brand => this.podborService.getBrands(brand)));
    
  }
  
clearProductFilter()
{
  this.searchByProductId.setValue(null);
  this.doFilter();
}

clearBrandFilter()
{
  this.searchByBrand.setValue(null);
  this.doFilter();
}

  doFilter() {   
    
    
    let product = this.searchByProductId.value;
    //let productId=this.searchByProductId!==null && this.searchByProductId.value!==null ? this.searchByProductId.value.value : null;
    
    
    let newFilter={product: product, brand:this.searchByBrand.value, model:null};
    console.log('n f is', newFilter) ; 

  this.store.dispatch(new SetFilterAction(  newFilter));
  
}

  displayProduct(result: IProduct) {
  if (result) { return result.name; }
}


}
