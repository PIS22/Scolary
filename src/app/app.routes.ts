import { Routes } from '@angular/router';
import { EtablissementComponent } from './pages/etablissement/etablissement.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/ecole' },
  {path:'ecole', component: EtablissementComponent},
  { path: 'manager', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) }
];
