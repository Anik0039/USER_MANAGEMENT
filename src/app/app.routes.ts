import { Routes } from '@angular/router';
import { DashboardLayoutComponent } from '../shared/components/dashboard-layout.component';
import { DashboardComponent } from '../features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
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
        path: 'settings',
        loadComponent: () => import('../features/settings/settings.component').then(m => m.SettingsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
