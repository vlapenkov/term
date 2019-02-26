
import { ICarModel } from "./carmodel";
import { IProduct } from "./iProduct";

export interface ICarItem
{
    id?:number,
    product?:IProduct,
    brand?:string,
    carModel?: ICarModel
}