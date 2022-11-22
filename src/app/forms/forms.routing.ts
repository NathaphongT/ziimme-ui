import { Routes } from '@angular/router';
import { from } from 'rxjs';
import { FormAccessComponent } from './form-access/form-access.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { FormUserComponent } from './form-user/form-user.component';

export const FormsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user',
        component: FormUserComponent,
        data: {
          title: 'form user',
        },
      },
      {
        path: 'employee',
        component: FormEmployeeComponent,
        data: {
          title: 'form employee',
        },
      },
      {
        path: 'access',
        component: FormAccessComponent,
        data: {
          title: 'form access',
        },
      },
    ],
  },
];
