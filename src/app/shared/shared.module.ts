import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { Error404Component } from './error404/error404.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [PagerComponent, SearchComponent, Error404Component],
  exports:      [ PagerComponent, SearchComponent,
    CommonModule, FormsModule ]
})
export class SharedModule { }
