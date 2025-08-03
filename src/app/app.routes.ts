import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../shared/components/dashboard-layout.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';
import { LoginComponent } from '../features/auth/login.component';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'users',
        loadComponent: () => import('../features/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'analytics',
        loadComponent: () => import('../features/analytics/analytics.component').then(m => m.AnalyticsComponent)
      },
      {
        path: 'reports',
        loadComponent: () => import('../features/reports/reports.component').then(m => m.ReportsComponent)
      },
      {
        path: 'profile',
        loadComponent: () => import('../features/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'settings',
        loadComponent: () => import('../features/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
