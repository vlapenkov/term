
import { Action } from '@ngrx/store';
import { ICarItem } from '../models/caritem';
import { carItems } from '../mocks/cartItems';


export enum CarItemActionTypes {
    LOAD = '[Task] LOAD Requested',
    ADD = '[Task] CREATE Requested',
    UPDATE = '[Task] UPDATE Requested',
    REMOVE = '[Task] REMOVE Requested',
    ERROR = '[Task] Error',
    REMOVEALL='REMOVE ALL'
  }

  export const initialCarItems: ICarItem[] = [];

  
export class LoadCarItemsAction implements Action {
    type = CarItemActionTypes.LOAD;
    constructor(public  param: ICarItem[] ) { }
  }

export class AddCarItemAction implements Action {
  type = CarItemActionTypes.ADD;
  constructor(public  carItem: ICarItem ) { }
}

export class RemoveCarItemAction implements Action {
    type = CarItemActionTypes.REMOVE;
    constructor(public  id: number ) { }
  }


export type CarItemAction
  =LoadCarItemsAction 
  |AddCarItemAction
  |RemoveCarItemAction
   ;

  export function carItemsReducer(
    state = initialCarItems, action: CarItemAction): ICarItem[]{
  
    switch (action.type) {
  
      case CarItemActionTypes.LOAD:
        {           
         return [...initialCarItems,... ( action as LoadCarItemsAction).param]

        }
        
        case CarItemActionTypes.ADD:
        {        
         
          return [...state, ( action as AddCarItemAction).carItem];
          // immutable too
          //  return state.concat({id:numberOfItems,name:nextName});
        }        
        case CarItemActionTypes.REMOVE:
        {

      let list = state.filter(({ id }) => id !== (action as RemoveCarItemAction).id);

      return [...list] ;
        }
      default:
        return state;
    }
  };