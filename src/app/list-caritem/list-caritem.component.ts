import { Component, OnInit, OnDestroy } from '@angular/core';
import {ICarItem} from '../shareddata/models/caritem';
import { Store } from '@ngrx/store';
import { AppState } from '../appstate';
import { Observable, Subscription } from 'rxjs';
import { OrchestrService } from '../shareddata/services/orchestr.service';
import { LoadCarItemsAction } from '../shareddata/store/caritemsreducer';

@Component({
  selector: 'app-list-caritem',
  templateUrl: './list-caritem.component.html',
  styleUrls: ['./list-caritem.component.css']
})
export class ListCaritemComponent implements OnInit {
  
p:number;
  
  showItemAdded:boolean=false;
  carItems$: Observable<ICarItem[]>;
  itemsPerPage:number= 50;
 

  constructor(private store: Store<AppState>, private  serviceO:OrchestrService) { }
  

  ngOnInit() {   
   this.carItems$ = this.serviceO.getCarItems();
  }


  delete(i){
    this.serviceO.delete(i);
 
  }
}
