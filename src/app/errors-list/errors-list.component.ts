import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../appstate';
import { LoadCarItemsAction, AddCarItemAction } from '../shared/store/caritemsreducer';
import { carItems } from '../shared/mocks/cartItems';
import { ICarItem } from '../shared/models/caritem';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-errors-list',
  templateUrl: './errors-list.component.html',
  styleUrls: ['./errors-list.component.css']
})
export class ErrorsListComponent implements OnInit {


  carItems$: Observable<ICarItem[]>; 
  constructor(private store: Store<AppState>) { 
    this.carItems$= store.pipe(select('carItems')); 

  }

  ngOnInit() {
  }


  load()
{
  this.store.dispatch(new LoadCarItemsAction( carItems))
}

add()
{
this.store.dispatch(new AddCarItemAction(carItems[0]));
}
}
