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

  showItemAdded:boolean=false;
  carItems$: Observable<ICarItem[]>=this.store.select('carItems');
  //carItems: ICarItem[] = carItems;

  constructor(private store: Store<AppState>, private  serviceO:OrchestrService) { 
    //actions.getUsers();
    
    this.serviceO.getCarItems();
  }

  ngOnInit() {
   // this.carItems$ = this.store.select('carItems');
  }

  

  delete(i){
    this.serviceO.delete(i);
 
  }
}
