import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { ICarModel } from '../../shared/models/carmodel';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/productbyid.service';
import { PodborByAutoService } from '../../shared/services/podbor-by-auto.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import {ICarItem} from '../../shared/models/caritem';
import { Store } from '@ngrx/store';
import { AppState } from '../../appstate';
import { IProduct } from 'src/app/shared/models/iProduct';
import { AddCarItemAction } from 'src/app/shared/store/caritemsreducer';
import { OrchestrService } from 'src/app/shared/services/orchestr.service';


@Component({
  selector: 'app-new-caritem',
  templateUrl: './new-caritem.component.html',
  styleUrls: ['./new-caritem.component.css']
})
export class NewCaritemComponent implements OnInit {
 
  @Output()
  public setCarItem: EventEmitter<ICarItem> = new EventEmitter();
  
  _filteredproducts$ :Observable<IProduct[]>;
_brands$ : Observable<string[]>;
_models$ : Observable<ICarModel[]> = empty();

productsForm: FormGroup;


constructor(private service: ProductService,
 private podborService: PodborByAutoService ,
  private fb: FormBuilder ,private store: Store<AppState>, private serviceO:OrchestrService) { 

  }

  ngOnInit(): void {
    this.productsForm= new FormGroup (
      {productInput: new FormControl('',[Validators.required]),
      brandInput: new FormControl('',[Validators.required]),
      modelInput: new FormControl(''),
      textCtrl: new FormControl('test',[Validators.required]),
    });


      

this._filteredproducts$ = this.productsForm.get('productInput').valueChanges.pipe(  
  debounceTime(200),
  distinctUntilChanged(),
  switchMap(value => this.service.getAllProducts(value)));
    
    
    this._brands$ = this.productsForm.get('brandInput').valueChanges.pipe(  
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(brand => this.podborService.getBrands(brand)));
        
      
    
  this._models$= this.productsForm.get('modelInput').valueChanges.pipe(  
    debounceTime(200),
    distinctUntilChanged(),
    tap(console.log),
    switchMap(val =>      
      this.podborService.getModels(/*()=>*/this.productsForm.get('brandInput').value,
     this.getTypedModel(val))));
      
  }

  
  onBrandChanged()
  {
    this.productsForm.get('modelInput').setValue({name:'',slug:''});
  }

 getActiveBrand() {return this.productsForm.get('brandInput').value ||''};

 displayFn(result: IProduct) {
   if (result) { return result.productId; }
 }
 
 displayModel(result: ICarModel) {
   if (result) { return result.name; }
 }

 getTypedModel (val :any) {
     
  if (typeof(val)==="undefined") return "";
  if (typeof(val)==="string") return val; 
  return (val as ICarModel).slug;
}

onSubmit() {
  // TODO: Use EventEmitter with form value
 //console.warn(this.productsForm.get('brandInput').value );

 let carItem: ICarItem = {product:this.productsForm.get('productInput').value,
                          brand: this.productsForm.get('brandInput').value,
                          carModel:this.productsForm.get('modelInput').value
                          }

                          this.serviceO.add(carItem);
  //                        console.log('submited',carItem )
  //                        this.setCarItem.emit(carItem);
                       //  console.log(carItem);
}



}
