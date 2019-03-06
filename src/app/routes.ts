import { Route } from "@angular/router";
import {ListCaritemComponent} from './list-caritem/list-caritem.component';
import { ErrorsListComponent } from "./errors-list/errors-list.component";
import { LoginComponent } from "./login/login.component";
/*import { InfoComponent } from "./components/info/info.component";
import { ListitemComponent } from "./components/listcontainer/list/listitem/listitem.component";
/import { ListcontainerComponent } from "./components/listcontainer/listcontainer.component";
import { ListCarComponent } from "./components/listcontainer/list/list.component";
import { UserComponent } from "./components/listcontainer/user/user.component";
import { UserResolveService } from "../services/userresolve.service";
import { FormComponent } from "./components/form/form.component";
import { Observable } from "rxjs";
import { ObservableTestComponent } from "./components/observable-test/observable-test.component";
*/

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
  path:'errors',
  component:ErrorsListComponent    
  },
 
  {
    path:'login',
    component:LoginComponent    
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