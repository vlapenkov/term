import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

import { ProductService } from '../../shareddata/services/productbyid.service';
import { PodborByAutoService } from '../../shareddata/services/podbor-by-auto.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap, map, first, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/appstate';
import { SetFilterAction } from 'src/app/shareddata/store/caritemsfilterreducer';
import { of, Subscription } from 'rxjs';
import { IProduct } from 'src/app/shareddata/models/iProduct';
import { ICarItem } from 'src/app/shareddata/models/caritem';

@Component({
  selector: 'app-filter-cartitem',
  templateUrl: './filter-cartitem.component.html',
  styleUrls: ['./filter-cartitem.component.css']
})
export class FilterCartitemComponent implements OnInit, OnDestroy {

  _subscription:Subscription;
  

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
 //  this._subscription= this.store.select('filter').subscribe(currentFilter=>this.initValues(currentFilter));

  
    this._filteredproducts$ = this.searchByProductId.valueChanges.pipe(  
   
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(value => this.service.getAllProducts(value)));
      
      this._brands$ = this.searchByBrand.valueChanges.pipe(  
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(brand => this.podborService.getBrands(brand)));
    
  }
  
clearFilter(nameOfFilter:string)
{
  if(nameOfFilter==='product')  this.searchByProductId.setValue(null);
  else   this.searchByBrand.setValue(null);

  this.doFilter(null);
}

ngOnDestroy(): void {
 // this._subscription.unsubscribe();
}

  doFilter(event) {   
        
    let product = this.searchByProductId.value;
    //let productId=this.searchByProductId!==null && this.searchByProductId.value!==null ? this.searchByProductId.value.value : null;
        
    let newFilter={product: product, brand:this.searchByBrand.value, model:null};
    

  this.store.dispatch(new SetFilterAction(  newFilter));
  
}

  displayProduct(result: IProduct) {
  if (result) { return result.name; }
}


}
