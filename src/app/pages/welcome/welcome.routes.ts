import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { CaisseComponent } from '../def/caisse/caisse.component';
import { ClasseComponent } from '../def/classe/classe.component';
import { GroupeMatiereComponent } from '../def/groupe-matiere/groupe-matiere.component';
import { ModeRegComponent } from '../man/mode-reg/mode-reg.component';
import { MatiereComponent } from '../def/matiere/matiere.component';
import { EnseignantComponent } from '../def/enseignant/enseignant.component';
import { ExerciceComponent } from '../def/exercice/exercice.component';
import { AnneeComponent } from '../def/annee/annee.component';
import { DiplomeComponent } from '../def/diplome/diplome.component';
import { EleveComponent } from '../def/eleve/eleve.component';
import { FraisComponent } from '../def/frais/frais.component';
import { AccueilComponent } from '../accueil/accueil.component';
import { TypeEvaluationComponent } from '../param/type-evaluation/type-evaluation.component';
import { TypeFraisComponent } from '../param/type-frais/type-frais.component';
import { NiveauComponent } from '../param/niveau/niveau.component';
import { InscriptionComponent } from '../inscription/inscription.component';
import { EleveClasseComponent } from '../oper/eleve-classe/eleve-classe.component';
import { EvaluationComponent } from '../def/evaluation/evaluation.component';
import { EnsClasseComponent } from '../oper/ens-classe/ens-classe.component';
import { NoteComponent } from '../oper/note/note.component';
import { TrancheComponent } from '../def/tranche/tranche.component';

export const WELCOME_ROUTES: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      { path: 'accueil', component: AccueilComponent },
      { path: 'inscription', component: InscriptionComponent },
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      {
        path: 'fichier',
        children: [
          { path: 'annee_scolaire', component: AnneeComponent },
          { path: 'caisse', component: CaisseComponent },
          { path: 'classe', component: ClasseComponent },
          { path: 'diplome', component: DiplomeComponent },
          { path: 'eleve', component: EleveComponent },
          { path: 'enseignant', component: EnseignantComponent },
          { path: 'exercice', component: ExerciceComponent },
          { path: 'matiere', component: MatiereComponent },
        ],
      },
      {
        path: 'operation',
        children: [
          { path: 'enseignant_classe', component: EnsClasseComponent },
          { path: 'eleve_classe', component: EleveClasseComponent },
          { path: 'evaluation', component: EvaluationComponent },
          { path: 'note', component: NoteComponent },
        ],
      },
      {
        path: 'param',
        children: [
          { path: 'groumat', component: GroupeMatiereComponent },
          { path: 'niveau', component: NiveauComponent },
          { path: 'type_eval', component: TypeEvaluationComponent },
          { path: 'type_frais', component: TypeFraisComponent },
          { path: 'frais', component: FraisComponent },
          { path: 'tranche', component: TrancheComponent },
          { path: 'modereg', component: ModeRegComponent },
        ],
      },
      {
        path: 'admin',
        children: [
          { path: 'role', component: CaisseComponent },
          { path: 'utilisateur', component: CaisseComponent },
        ],
      },
    ],
  },
];
