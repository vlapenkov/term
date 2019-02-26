import { Component, OnInit } from '@angular/core';
import {ICarItem} from '../shared/models/caritem';
import { carItems } from '../shared/mocks/cartItems';
import { Store } from '@ngrx/store';
import { AppState } from '../appstate';
import { Observable } from 'rxjs';
import { OrchestrService } from '../shared/services/orchestr.service';

@Component({
  selector: 'app-list-caritem',
  templateUrl: './list-caritem.component.html',
  styleUrls: ['./list-caritem.component.css']
})
export class ListCaritemComponent implements OnInit {

  carItems$: Observable<ICarItem[]>;
  //carItems: ICarItem[] = carItems;

  constructor(private store: Store<AppState>, private  serviceO:OrchestrService) { 
    //actions.getUsers();
    
    this.serviceO.getCarItems();
  }

  ngOnInit() {
    this.carItems$ = this.store.select('carItems');
  }

  addCarItem(event)
  {
   // console.log(this.carItems[this.carItems.length-1]===event);
  //  this.carItems.push(event);
    //console.log(event);
  }

  delete(i){
    this.serviceO.delete(i);
 // this.carItems.splice(i,1);
  }
}
