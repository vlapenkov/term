import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { ICarModel } from '../../shared/models/carmodel';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ProductService } from '../../shared/services/productbyid.service';
import { PodborByAutoService } from '../../shared/services/podbor-by-auto.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import {ICarItem} from '../../shared/models/caritem';
import { Store } from '@ngrx/store';
import { AppState } from '../../appstate';
import { IProduct } from 'src/app/shared/models/iProduct';
import { AddCarItemAction } from 'src/app/shared/store/caritemsreducer';
import { OrchestrService } from 'src/app/shared/services/orchestr.service';
import { MatAutocomplete } from '@angular/material';
import { strictEqual } from 'assert';
import { asyncProductExistsValidator } from 'src/app/shared/services/productExistsValidator';



@Component({
  selector: 'app-new-caritem',
  templateUrl: './new-caritem.component.html',
  styleUrls: ['./new-caritem.component.css']
})
export class NewCaritemComponent implements OnInit {
 
  @ViewChild("autoProduct") mProduct: MatAutocomplete;
  @ViewChild("autoBrand") mBrand: MatAutocomplete;
  @Output()
  public setCarItem: EventEmitter<ICarItem> = new EventEmitter();
  errors = [];
  
  _filteredproducts$ :Observable<IProduct[]>;
_brands$ : Observable<string[]>;
_models$ : Observable<ICarModel[]> = empty();

brands:string[];
productsForm: FormGroup;


constructor(private service: ProductService,
 private podborService: PodborByAutoService ,
  private fb: FormBuilder ,
  private store: Store<AppState>, 
  private serviceO:OrchestrService) { 

  }

  ngOnInit(): void {
    //debugger;
    this.productsForm= new FormGroup (
      {productInput: new FormControl('',[Validators.required],[asyncProductExistsValidator(this.service)]) ,
      brandInput: new FormControl('',[Validators.required, FormCustomValidators.valueSelected(()=>this.getBrands())]),
      modelInput: new FormControl(''),
      //testCtrl: new FormControl('test',[Validators.required]),
    });


      

this._filteredproducts$ = this.productsForm.get('productInput').valueChanges.pipe(  
  debounceTime(200),
  distinctUntilChanged(),
 // tap(x=>console.log('val is',x)),
  switchMap(value => this.service.getAllProducts(value)));
    
    
    this._brands$ = this.productsForm.get('brandInput').valueChanges.pipe(  
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(brand => this.podborService.getBrands(brand)));
        
    //  this._brands$.subscribe(brands=>this.brands=brands);
    
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

 displayProduct(result: IProduct) {
   if (result) { return result.productId; }
 }
 
 displayModel(result: ICarModel) {
   if (result) { return result.name; }
 }


getBrands()
{
  let options =this.mBrand.options;
if (options) 
{let result=  this.mBrand.options.map(({ value }) => value);
//debugger;
return result;}
else return [];
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


                          this.serviceO.add(carItem,this.afterAdded.bind(this));
  //                        console.log('submited',carItem )
  //                        this.setCarItem.emit(carItem);
                       //  console.log(carItem);
}

afterAdded(result)
{
debugger;
  
if (result && result.status=== 400 && result.error ) 
  if( result.error[""] && Array.isArray(result.error[""]))
  
  //  this.productsForm.get('productInput').setErrors({'incorrect': true});
  this.productsForm.setErrors({'incorrect': true});
  
}


}





export class FormCustomValidators {
  static valueSelected(callback:Func<string,string[]> /*myArray: string[]*/): ValidatorFn {

    return (c: AbstractControl): { [key: string]: boolean } | null => {

     let myArray= callback("");
      let selectboxValue = c.value;
     
      let pickedOrNot = myArray.filter(alias => alias === selectboxValue);

      if (pickedOrNot.length > 0) {
        // everything's fine. return no error. therefore it's null.
        return null;

      } else {
        //there's no matching selectboxvalue selected. so return match error.
        return { 'match': true };
      }
    }
  }

    static requiredIf(callback: ()=>boolean/*myArray: string[]*/): ValidatorFn {
      return (c: AbstractControl): { [key: string]: boolean } | null => {
if (callback()) return null;
else
return {'condition':true}
      }
    
  }
}
