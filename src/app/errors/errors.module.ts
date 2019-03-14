import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ErrorsListComponent } from './errors-list/errors-list.component';
import { ErrorsGettingService } from './errors-getting.service';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {
        path: '',
        component: ErrorsListComponent
      },
      {
        path: 'next',
        component: ErrorsListComponent
      },
    ])
  ],
  declarations: [ErrorsListComponent],
  providers: [ErrorsGettingService]
})
export class ErrorsModule { }





