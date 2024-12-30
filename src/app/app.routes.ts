import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
<<<<<<< HEAD
    path: '',
=======
    path: 'new',
>>>>>>> b5099c3 (Initial commit with all files)
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component')
          .then(m => m.DashboardComponent),
        data: { animation: 'dashboard' }
      },
      {
        path: 'questionnaires',
        loadComponent: () => import('./pages/questionnaire/questionnaire-list/questionnaire-list.component')
          .then(m => m.QuestionnaireListComponent),
        data: { animation: 'questionnaires' }
      },
      {
<<<<<<< HEAD
        path: 'questionnaires/new',
=======
        path: 'questionnaire-form',
>>>>>>> b5099c3 (Initial commit with all files)
        loadComponent: () => import('./pages/questionnaire/questionnaire-form/questionnaire-form.component')
          .then(m => m.QuestionnaireFormComponent),
        data: { animation: 'questionnaire-form' }
      },
      {
        path: 'questionnaires/:id',
        loadComponent: () => import('./pages/questionnaire/questionnaire-form/questionnaire-form.component')
          .then(m => m.QuestionnaireFormComponent),
        data: { animation: 'questionnaire-form' }
      },
      {
        path: 'users',
        loadComponent: () => import('./pages/user/user-list/user-list.component')
          .then(m => m.UserListComponent),
        data: { animation: 'users' }
      },
      {
        path: 'external-forms',
        loadComponent: () => import('./pages/external-forms/external-forms.component')
          .then(m => m.ExternalFormsComponent),
        data: { animation: 'external-forms' }
      },
      {
        path: 'user-management',
        loadComponent: () => import('./pages/user-management/user-management.component')
          .then(m => m.UserManagementComponent),
        data: { animation: 'user-management' }
      }
    ]
  },
  {
<<<<<<< HEAD
    path: '**',
    redirectTo: 'login'
=======
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',

>>>>>>> b5099c3 (Initial commit with all files)
  }
];
