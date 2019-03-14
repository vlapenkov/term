
import { Action } from '@ngrx/store';
import { ICarItemsFilter } from '../models/ICarItemsFilter';
import { ICarItem } from '../models/caritem';
import { ILoginData } from '../models/iloginresponse';





export enum LoginActionTypes {
    SET = '[Login] NEW login Requested',    
  }



export const initialLogin: ILoginData = {access_token:null,username:null};

//let todoInitialState:ITodo[] = [];

export class SetLoginAction implements Action {
    type = LoginActionTypes.SET;
    constructor(public  param: ILoginData) { }
  }

  // не доступна извне


  export function loginReducer(
    state = initialLogin, action: SetLoginAction): ILoginData {
  
    switch (action.type) {
  
      case LoginActionTypes.SET:
        { 
        console.log('action is =', action)    ;
            return ( action as SetLoginAction).param
        }
    
  
      default:
        return state;
    }
  };
  