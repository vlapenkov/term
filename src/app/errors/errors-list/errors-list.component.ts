import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';


import { Observable, Subscription } from 'rxjs';
import { IErrorLog } from '../ierrorlog';
import { ErrorsGettingService } from '../errors-getting.service';

// dsfjh
@Component({
  selector: 'app-errors-list',
  templateUrl: './errors-list.component.html',
  styleUrls: ['./errors-list.component.css'],
  //providers:[ErrorsGettingService]
})
export class ErrorsListComponent implements OnInit {
  p:number;
  itemsPerPage:number= 50;
  errors$:Observable<IErrorLog[]>;

  constructor (private service :ErrorsGettingService)
  {
    this.errors$=this.service.getResults();
  }

  
  ngOnInit(): void {
 
  }

  public  doSearch(searchVal:string):void
  {
    this.service.setSearch(searchVal);
  }
  

  
}
