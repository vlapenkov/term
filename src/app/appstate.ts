import { ICarItem } from "../app/shared/models/caritem";
import { ICarItemsFilter } from "./shared/models/ICarItemsFilter";
import { ILoginData } from "./shared/models/iloginresponse";
import { ActionReducerMap } from "@ngrx/store";
import { loginReducer } from "./shared/store/loginreducer";
import { carItemsReducer } from "./shared/store/caritemsreducer";
import { filterReducer } from "./shared/store/caritemsfilterreducer";


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