import { Component, OnInit, OnDestroy } from '@angular/core';
import {ICarItem} from '../shared/models/caritem';
import { carItems } from '../shared/mocks/cartItems';
import { Store } from '@ngrx/store';
import { AppState } from '../appstate';
import { Observable, Subscription } from 'rxjs';
import { OrchestrService } from '../shared/services/orchestr.service';
import { LoadCarItemsAction } from '../shared/store/caritemsreducer';

@Component({
  selector: 'app-list-caritem',
  templateUrl: './list-caritem.component.html',
  styleUrls: ['./list-caritem.component.css']
})
export class ListCaritemComponent implements OnInit, OnDestroy {
  

  subscription:Subscription;
  showItemAdded:boolean=false;
  carItems$: Observable<ICarItem[]>;//=this.store.select('carItems');
  //carItems: ICarItem[] = carItems;

  constructor(private store: Store<AppState>, private  serviceO:OrchestrService) { 
  /*  this.carItems$=this.store.select(c=>c.carItems);
    
 this.subscription=    this.serviceO.getCarItems().subscribe(
  (list:ICarItem[]) => {    
    
    this.store.dispatch(new LoadCarItemsAction(list));}
    ,
    error =>console.log(error)
 );
 */
  }

  ngOnDestroy(): void {
   // this.subscription.unsubscribe();
   }

  ngOnInit() {   
   this.carItems$ = this.serviceO.getCarItems();
  }

  

  delete(i){
    this.serviceO.delete(i);
 
  }
}
