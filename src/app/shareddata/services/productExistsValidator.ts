import { AbstractControl, AsyncValidatorFn } from "@angular/forms";

import {Observable, of} from 'rxjs';
import {delay, find} from 'rxjs/internal/operators';
import { first, tap, filter, map } from 'rxjs/operators';
import { from } from 'rxjs';
import {ValidationErrors} from '@angular/forms/src/directives/validators';
import { ProductService } from "./productbyid.service";




/*
/*  needUser - works as false in signupForm and true in loginForm 
*/

export function asyncProductExistsValidator(productService:ProductService): AsyncValidatorFn {
    return (control: AbstractControl):  Observable<ValidationErrors | null> => {        
        //let param =(typeof control.value   ==="object") ? control.value.productId : control.value;
        return (typeof control.value   ==="object" && control.value.productId) ?  of(null) :of({userrequired:true})
    
    }   
    }