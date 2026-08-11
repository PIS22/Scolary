import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { AccueilComponent } from '../man/accueil/accueil.component';
import { CaisseComponent } from '../def/caisse/caisse.component';
import { ClasseComponent } from '../def/classe/classe.component';
import { GroupeMatiereComponent } from '../def/groupe-matiere/groupe-matiere.component';
import { ModeRegComponent } from '../man/mode-reg/mode-reg.component';
import { EtablissementComponent } from '../etablissement/etablissement.component';

export const WELCOME_ROUTES: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: 'accueil', component: AccueilComponent },
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      {
        path: 'fichier',
        children: [
          { path: 'caisse', component: CaisseComponent },
          { path: 'classe', component: ClasseComponent },
          { path: 'matiere', component: ClasseComponent },
        ],
      },
      {
        path: 'operation',
        children: [
          { path: 'classe_eleve', component: CaisseComponent },
          { path: 'evaluation', component: CaisseComponent },
          { path: 'evaluation', component: CaisseComponent },
          { path: 'note', component: CaisseComponent },
        ],
      },
      {
        path: 'param',
        children: [
          { path: 'ecole', component: EtablissementComponent },
          { path: 'groumat', component: GroupeMatiereComponent },
          { path: 'modereg', component: ModeRegComponent },
        ],
      },
      {
        path: 'admin',
        children: [
          { path: 'etab', component: EtablissementComponent },
          { path: 'role', component: CaisseComponent },
          { path: 'utilisateur', component: CaisseComponent },
        ],
      },
    ],
  },
];
