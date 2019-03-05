import { ICarItem } from "../app/shared/models/caritem";
import { ICarItemsFilter } from "./shared/models/ICarItemsFilter";
import { ILoginData } from "./shared/models/iloginresponse";


export interface AppState {
    //count: number,    
    login:ILoginData,
    carItems:ICarItem[],
    filter:ICarItem,
  }