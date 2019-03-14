import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.css']
})
export class PagerComponent implements OnInit {
  
  pageSizes =[10,50,100,500];  
  
  @Input()
  itemsPerPage:number; 

  @Output() itemsPerPageChanged: EventEmitter<number> = new EventEmitter();

  
  constructor() { }

  ngOnInit() {
  }

  onChangePageSize(event)
  {
      
   this.itemsPerPageChanged.emit(event);
  }

}
