import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
   
  
  @Input()
  searchValue:string; 

  @Output() searchChanged: EventEmitter<string> = new EventEmitter();

  
  constructor() { }

  ngOnInit() {
  }

  onSearch(event)
  {
      console.log('Search is ',event)
   this.searchChanged.emit(event);
  }

}
