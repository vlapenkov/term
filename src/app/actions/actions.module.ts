import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action/action.component';
import { RouterModule } from '@angular/router';
import { ActionsListComponent } from './actions-list/actions-list.component';
import { SharedModule } from '../shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActionsGettingService } from './actions-getting.service';
import { ActionResolveService } from './action-resolve.service';

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
        path: ':id',
        component: ActionComponent,
        resolve: {
          action:ActionResolveService
        }
      },
    ])
  ],
  
  declarations: [ActionComponent,ActionsListComponent],
  providers:[ActionsGettingService, ActionResolveService]
})
export class ActionsModule { }



