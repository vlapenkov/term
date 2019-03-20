import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
data:any;
  id:number;
  constructor(private route: ActivatedRoute) { 
    

  }

  ngOnInit() {
   this.data= this.route.snapshot.data;
  }

}
