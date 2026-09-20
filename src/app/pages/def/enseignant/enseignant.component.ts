import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { EnseignantService } from '../../../../services/enseignant.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContexteService } from '../../../../services/contexte.service';
import { EnseignantFormComponent } from './enseignant-form/enseignant-form.component';
import { Classe } from '../classe/classe.component';
import { Matiere } from '../matiere/matiere.component';
import { FormECComponent } from '../../oper/ens-classe/form-ec/form-ec.component';
import { NzGridModule } from 'ng-zorro-antd/grid';

export interface Enseignant {
  id: number;
  matricule: string;
  numNpi: string;
  nom: string;
  dateNaissance: Date;
  lieuNaissance: string;
  sexe: string;
  adresse: string;
  telephone: string;
  email: string;
  sitMat: string;
  specialite: string;
  grade: string;
  fonction: string;
  datePriseService: string;
  observation: string;
}

export interface EnseignerClasse {
  id: number|null;
  enseignant: Enseignant;
  maitreTitulaire: boolean;
  classe: Classe|null;
  matiere: Matiere|null;
  dateAffectation: Date;
}

@Component({
  selector: 'app-enseignant',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
    NzModalModule,
    NzDrawerModule,
    NzGridModule
  ],
  templateUrl: './enseignant.component.html',
  styleUrl: './enseignant.component.scss',
})
export class EnseignantComponent implements OnInit {

  searchInput: string = '';
  datas: Enseignant[] = [];
  displayed: Enseignant[] = [];

  constructor(
    private service: EnseignantService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getList().subscribe((res) => {
      this.datas = res;
      this.displayed = this.datas;
      console.log(this.displayed);
    });
  }

  create() {
    this.drawer
      .create<EnseignantFormComponent, { valueIn: any }>({
        nzTitle: 'Créer un enseignant',
        nzContent: EnseignantFormComponent,
        nzWidth: 600,
        nzData: {
          valueIn: {
            id: null,
            code: '',
            libelle: '',
            dateDeb: new Date(),
            dateFin: new Date(),
          },
        },
      })
      .afterClose.subscribe((data) => {
        if (data) {
          this.datas.push(data);
          this.displayed = [...this.datas];
        }
      });
  }

  search() {
    this.displayed = this.datas.filter((d) => {
      return (
        d.nom.includes(this.searchInput) ||
        d.matricule.includes(this.searchInput) ||
        d.grade.includes(this.searchInput) ||
        d.fonction.includes(this.searchInput) ||
        d.specialite.includes(this.searchInput) ||
        d.matricule.includes(this.searchInput)
      );
    });
  }

  edit(_t52: Enseignant) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<EnseignantFormComponent, { valueIn: Enseignant }>({
        nzTitle: "Modifier l'enseignant",
        nzContent: EnseignantFormComponent,
        nzWidth: 600,
        nzData: {
          valueIn: _t52,
        },
      })
      .afterClose.subscribe((data) => {
        if (data) {
          this.datas[ind] = data;
          this.displayed[ind] = data;
          this.displayed = [...this.displayed];
        }
      });
  }

  confirmDeleting(_t72: Enseignant) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent: '<i>Etes-vous sûr de vouloir supprimer l\'enseignant ' + _t72.nom + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: Enseignant) {
    this.service.delete(_t72.id).subscribe((res) => {
      if (res) {
        this.datas.splice(
          this.datas.findIndex((d) => d.id == _t72.id),
          1,
        );
        this.displayed.splice(
          this.displayed.findIndex((d) => d.id == _t72.id),
          1,
        );
        this.displayed = [...this.displayed];
      }
    });
  }

  popNewClassAssignation(_t68: Enseignant) {
    this.drawer.create<FormECComponent, { valueIn: EnseignerClasse }>({
      nzContent: FormECComponent,
      nzData: {
        valueIn: {
          id: null,
          enseignant: _t68,
          classe: null,
          dateAffectation: new Date(),
          maitreTitulaire: true,
          matiere: null
        }
      },
      nzWidth: 500,
      nzTitle: 'Assignation de classe'
    })
  }

  showClassAssignation(_t68: Enseignant) {}
}
