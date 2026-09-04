import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule, NzCardComponent } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import {
  NzDrawerRef,
  NzDrawerModule,
  NzDrawerService,
} from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ContexteService } from '../../../services/contexte.service';
import { EleveService } from '../../../services/eleve.service';
import { Eleve } from '../def/eleve/eleve.component';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Site } from '../etablissement/etablissement.component';
import { ClasseService } from '../../../services/classe.service';
import { Niveau } from '../param/niveau/niveau.component';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Annee } from '../def/annee/annee.component';
import { NzDragService } from 'ng-zorro-antd/core/services';
import { InscriptionFormComponent } from './inscription-form/inscription-form.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface Inscription {
  id: number;
  eleve: Eleve;
  etablissement: Site;
  anneeScolaire: Annee;
  numeroInscription: string;
  dateInscription: Date;
  statut: 'ENCOURS' | 'VALIDE' | 'ANNULE';
  observation: string | null;
  classeDemandee: string;
}

export enum Statuts {
  'ENCOURS',
  'VALIDEE',
  'ANNULEE',
}

@Component({
  selector: 'app-inscription',
  imports: [
    CommonModule,
    NzTableComponent,
    NzCardComponent,
    NzInputModule,
    FormsModule,
    NzDrawerModule,
    DatePipe,
    NzIconModule,
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent implements OnInit {
  @Input() valueIn!: any;
  dataForm!: FormGroup;
  ins = true;
  datas: Inscription[] = [];
  displayed: Inscription[] = [];

  constructor(
    private fb: FormBuilder,
    private service: EleveService,
    private serv: ClasseService,
    private cont: ContexteService,
    private drawer: NzDrawerService,
  ) {}

  ngOnInit(): void {
    if (this.cont.etsId && this.cont.anneeId)
      this.service
        .getListSubscriptionByEtabAnnee(this.cont.etsId, this.cont.anneeId)
        .subscribe((res) => {
          console.log(res)
          this.datas = res;
          this.displayed = this.datas;
        });
  }

  search() {}

  validate(_t37: Inscription) {
    throw new Error('Method not implemented.');
  }
  searchInput: string = '';
  create() {
    this.drawer
      .create<InscriptionFormComponent, { valueIn: Inscription | null }>({
        nzContent: InscriptionFormComponent,
        nzData: { valueIn: null },
        nzTitle: 'Nouvelle inscription / réinscription',
        nzWidth: 1150,
      })
      .afterClose.subscribe((data) => {
        if (data && data.id) {
          this.datas.push(data);
          this.displayed = [...this.datas];
        }
      });
  }
  edit(_t21: any) {
    this.drawer
      .create<InscriptionFormComponent, { valueIn: Inscription | null }>({
        nzContent: InscriptionFormComponent,
        nzData: { valueIn: _t21 },
        nzTitle: 'Modifier inscription / réinscription',
        nzWidth: 1150,
      })
      .afterClose.subscribe((data) => {
        if (data && data.id) {
          this.datas[this.datas.findIndex((d) => d.id == data.id)] = data;
          this.displayed = [...this.datas];
        }
      });
  }
  confirmDeleting(_t21: any) {}
}
