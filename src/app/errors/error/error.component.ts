import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
data:any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.data= this.route.snapshot.data;
  }

}
