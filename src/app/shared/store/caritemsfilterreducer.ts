
import { Action } from '@ngrx/store';
import { ICarItemsFilter } from '../models/ICarItemsFilter';
import { ICarItem } from '../models/caritem';





export enum FilterActionTypes {
    SET = '[Task] LOAD Filter Requested',    
  }



export const initialFilter: ICarItem = {};

//let todoInitialState:ITodo[] = [];

export class SetFilterAction implements Action {
    type = FilterActionTypes.SET;
    constructor(public  param: ICarItem) { }
  }

  // не доступна извне


  export function filterReducer(
    state = initialFilter, action: SetFilterAction): ICarItem {
  
    switch (action.type) {
  
      case FilterActionTypes.SET:
        { 
        console.log('action is =', action)    ;
            return ( action as SetFilterAction).param
        }
    
  
      default:
        return state;
    }
  };
  