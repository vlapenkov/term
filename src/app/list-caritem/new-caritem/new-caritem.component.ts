import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable, empty } from 'rxjs';
import { ICarModel } from '../../shareddata/models/carmodel';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ProductService } from '../../shareddata/services/productbyid.service';
import { PodborByAutoService } from '../../shareddata/services/podbor-by-auto.service';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import {ICarItem} from '../../shareddata/models/caritem';
import { Store } from '@ngrx/store';
import { AppState } from '../../appstate';
import { IProduct } from 'src/app/shareddata/models/iProduct';
import { OrchestrService } from 'src/app/shareddata/services/orchestr.service';
import { MatAutocomplete, MatSnackBar } from '@angular/material';
import { strictEqual } from 'assert';
import { asyncProductExistsValidator } from 'src/app/shareddata/services/productExistsValidator';
import { generateYears } from 'src/app/shareddata/services/yearsgenerator';



@Component({
  selector: 'app-new-caritem',
  templateUrl: './new-caritem.component.html',
  styleUrls: ['./new-caritem.component.css']
})
export class NewCaritemComponent implements OnInit {
 
  @ViewChild("autoProduct") mProduct: MatAutocomplete;
  @ViewChild("autoBrand") mBrand: MatAutocomplete;
  
  
  
  
  _filteredproducts$ :Observable<IProduct[]>;
_brands$ : Observable<string[]>;
_models$ : Observable<ICarModel[]> = empty();

brands:string[];
_years:number[];
productsForm: FormGroup;


constructor(private service: ProductService,
 private podborService: PodborByAutoService ,
  private fb: FormBuilder ,
  private store: Store<AppState>, 
  private serviceO:OrchestrService,
  private snackBar: MatSnackBar
  ) { 
this._years = generateYears();
  }

  ngOnInit(): void {
    //debugger;
/*    this.productsForm= new FormGroup (
      {productInput: new FormControl('',[Validators.required],[asyncProductExistsValidator(this.service)]) ,
      brandInput: new FormControl('',[Validators.required, FormCustomValidators.valueSelected(()=>this.getBrands())]),
      modelInput: new FormControl(''),
      yearInput:new FormControl(''),
      //testCtrl: new FormControl('test',[Validators.required]),
    }); */


    this.productsForm= this.fb.group (
      {productInput: ['',[Validators.required],[asyncProductExistsValidator(this.service)]] ,
      brandInput: ['',[Validators.required, FormCustomValidators.valueSelected(()=>this.getBrands())]],
      modelInput: '',
      yearInput:'',
      
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

  empty()
  {}

  onBrandChanged(event)
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
  

 let carItem: ICarItem = {product:this.productsForm.get('productInput').value,
                          brand: this.productsForm.get('brandInput').value,
                          carModel:this.productsForm.get('modelInput').value,
                          year:this.productsForm.get('yearInput').value
                          }


                          this.serviceO.add(carItem,this.afterAdded.bind(this));
 
}

afterAdded(resultError)
{
if (resultError)
  this.productsForm.setErrors(resultError);
  else
  this.snackBar.open('Запись добавлена', 'Закрыть', {
    duration: 3000
  });
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
