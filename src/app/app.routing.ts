import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
//Layouts
import {
  SimplyWhiteLayout,
  BlankSimplywhiteComponent,
  BlankCasualComponent,
  CasualLayout,
} from './@pages/layouts';
import { AuthGuard } from './auth.guard';
import { FormsPageModule } from './forms/forms.module';
import { SessionModule } from './session/session.module';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/home/forms/employee', pathMatch: 'full' },
  {
    path: 'home',
    component: SimplyWhiteLayout,
    canActivate: [AuthGuard],
    children: [{ path: 'forms', loadChildren: () => FormsPageModule }],
  },
  {
    path: 'home',
    component: BlankSimplywhiteComponent,
    canActivate: [AuthGuard],
    children: [{ path: 'dashboard', component: DashboardComponent }],
  },
  {
    path: 'home',
    component: BlankCasualComponent,
    children: [{ path: 'session', loadChildren: () => SessionModule }],
  },
];
