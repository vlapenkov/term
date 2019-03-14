import { ICarItem } from "../app/shareddata/models/caritem";
import { ILoginData } from "./shareddata/models/iloginresponse";
import { ActionReducerMap } from "@ngrx/store";
import { loginReducer } from "./shareddata/store/loginreducer";
import { carItemsReducer } from "./shareddata/store/caritemsreducer";
import { filterReducer } from "./shareddata/store/caritemsfilterreducer";


export interface AppState {
    //count: number,    
    login:ILoginData,
    carItems:ICarItem[],
    filter:ICarItem,
  }

   const reducers : ActionReducerMap<AppState> =
  {
    login: loginReducer, carItems:carItemsReducer, filter:filterReducer
  }

  export {reducers}