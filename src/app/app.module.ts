import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { AppComponent } from './app.component';
import {ListCaritemComponent} from './list-caritem/list-caritem.component';
import { ErrorsListComponent } from './errors-list/errors-list.component';
import { NewCaritemComponent } from './list-caritem/new-caritem/new-caritem.component'
import {MatAutocompleteModule,MatFormFieldModule,MatInputModule} from  '@angular/material';
import { environment } from '../environments/environment';
import { TERMINAL_URL } from './config';
import { ProductService } from './shared/services/productbyid.service';
import { PodborByAutoService } from './shared/services/podbor-by-auto.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { carItemsReducer } from './shared/store/caritemsreducer';
import { FilterCartitemComponent } from './list-caritem/filter-cartitem/filter-cartitem.component';
import { filterReducer } from './shared/store/caritemsfilterreducer';


@NgModule({
  declarations: [
    AppComponent,
    ListCaritemComponent,
    ErrorsListComponent,
    NewCaritemComponent,
    FilterCartitemComponent
  ],
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot( { carItems:carItemsReducer, filter:filterReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [ProductService,PodborByAutoService,{ provide: TERMINAL_URL, useValue: environment.terminalUrl },],
  bootstrap: [AppComponent]
})
export class AppModule { }