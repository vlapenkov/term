import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';


import { Observable, Subscription } from 'rxjs';

//import { ErrorsGettingService } from '../errors-getting.service';
import { IDbAction } from '../iDbAction';
import { ActionsGettingService } from '../actions-getting.service';

// dsfjh
@Component({
  selector: 'actions-list',
  templateUrl: './actions-list.component.html',  
  //providers:[ErrorsGettingService]
})
export class ActionsListComponent implements OnInit {
  
  itemsPerPage:number= 50;
  actions$:Observable<IDbAction[]>;

  constructor (private service :ActionsGettingService)
  {
    this.actions$=this.service.getResults();
  }

  
  ngOnInit(): void {
 
  }

  public  doSearch(searchVal:string):void
  {
    this.service.setSearch(searchVal);
  }
  

  
}
