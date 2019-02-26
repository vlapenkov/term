import { ICarItem } from "../app/shared/models/caritem";
import { ICarItemsFilter } from "./shared/models/ICarItemsFilter";


export interface AppState {
    //count: number,
    carItems:ICarItem[],
    filter:ICarItem
  }