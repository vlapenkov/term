import { Route } from "@angular/router";
import {ListCaritemComponent} from './list-caritem/list-caritem.component';
import { LoginComponent } from "./login/login.component";
import { ActionsModule } from "./actions/actions.module";
import { ErrorsModule } from "./errors/errors.module";


export const routes: Route[] = [
  {
      path:'',
      redirectTo:'list',
      pathMatch:'full'
      },
{
path:'list',
component:ListCaritemComponent    
},
{
  path:'login',
  component:LoginComponent    
},  

{
  path:'errors',
  //component:ErrorsListComponent    
  loadChildren: './errors/errors.module#ErrorsModule'
  },
 
  
  {
    path: 'actions',
    loadChildren: './actions/actions.module#ActionsModule'
  },
{
path:'**',
redirectTo:'list'
}
];

/*
export const routes: Route[] = [
    {
        path:'',
        redirectTo:'list',
        pathMatch:'full'
        },

{
path:'info',
loadChildren:"./info/info.module#InfoModule"
},
{
    path:'form',
    component:FormComponent
    },

    {
        path:'observables',
        component:ObservableTestComponent
        },
{
path:'list',
component:ListcontainerComponent,
children: [
    
    {
        path: ':userId',
        component: UserComponent,
        data: {
          title: 'User Info'
        },
        resolve: {
          user: UserResolveService
        }
      },
      {
        path: '',
        component: ListComponent
      },
],
},
{
path:'**',
redirectTo:'list'
}
];
*/
/*
export const routes: Route [] = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: '',
        component: UsersListComponent
      },
      {
        path: ':userId',
        component: UserComponent,
        data: {
          title: 'User Info'
        },
        resolve: {
          user: UserResolveService
        }
      },
      {
        path: '**',
        redirectTo: '/info'
      }
    ]
  },
  {
    path: 'info',
    loadChildren: './content/info/info.module#InfoModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]; */