import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ErrorsListComponent } from './errors-list/errors-list.component';
import { ErrorsGettingService } from './errors-getting.service';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ErrorComponent } from './error/error.component';
import { ErrorResolveService } from './error-resolve.service';

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
        path: ':id',
        component: ErrorComponent,
        resolve: {
          action:ErrorResolveService
        }
      },

    ])
  ],
  declarations: [ErrorsListComponent, ErrorComponent],
  providers: [ErrorsGettingService, ErrorResolveService]
})
export class ErrorsModule { }





