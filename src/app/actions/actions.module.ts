import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { RouterModule } from '@angular/router';
import { ActionsListComponent } from './actions-list/actions-list.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActionsGettingService } from './actions-getting.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgxPaginationModule,
    RouterModule.forChild([
      {
        path: '',
        component: ActionsListComponent
      },
      {
        path: 'next',
        component: TestComponent
      },
    ])
  ],
  
  declarations: [TestComponent,ActionsListComponent],
  providers:[ActionsGettingService]
})
export class ActionsModule { }



