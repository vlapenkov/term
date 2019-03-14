import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagerComponent } from './pager/pager.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [PagerComponent, SearchComponent],
  exports:      [ PagerComponent, SearchComponent,
    CommonModule, FormsModule ]
})
export class SharedModule { }
