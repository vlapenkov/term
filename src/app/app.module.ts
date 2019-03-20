import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { AppComponent } from './app.component';
import {ListCaritemComponent} from './list-caritem/list-caritem.component';

import { NewCaritemComponent } from './list-caritem/new-caritem/new-caritem.component'
import {MatAutocompleteModule,MatFormFieldModule,MatInputModule, MatSnackBarModule} from  '@angular/material';
import { environment } from '../environments/environment';
import { TERMINAL_URL } from './config';
import { ProductService } from './shareddata/services/productbyid.service';
import { PodborByAutoService } from './shareddata/services/podbor-by-auto.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FilterCartitemComponent } from './list-caritem/filter-cartitem/filter-cartitem.component';
import {NgxPaginationModule} from 'ngx-pagination';

import { LoginComponent } from './login/login.component'; // <-- import the module
import { reducers } from './appstate';
import { TokenInterceptor } from './shareddata/services/token.interceptor';
import { SharedModule } from './shared/shared.module';
import { MatSidenavModule } from '@angular/material';
//import { PageListComponent } from './page-list/page-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ListCaritemComponent,    
    NewCaritemComponent,
    FilterCartitemComponent,    
    LoginComponent
  ],
  imports: [
    MatSnackBarModule,
    MatAutocompleteModule,
    MatFormFieldModule,MatInputModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    SharedModule,
    MatSidenavModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot(reducers /*{login: loginReducer, carItems:carItemsReducer, filter:filterReducer}*/),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [ProductService,PodborByAutoService,{ provide: TERMINAL_URL, useValue: environment.terminalUrl },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi:true

    } 
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
