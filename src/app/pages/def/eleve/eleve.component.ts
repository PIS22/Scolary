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
import { FraisService } from '../../../../services/frais.service';
import { Frais } from '../frais/frais.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContexteService } from '../../../../services/contexte.service';
import { FraisFormComponent } from '../frais/frais-form/frais-form.component';
import { EleveService } from '../../../../services/eleve.service';
import { EleveFormComponent } from './eleve-form/eleve-form.component';

export interface Eleve{
  id: number;
  nom: string;
  //prenom: string;
  sexe: string;
  dateNaissance: Date;
  lieuNaissance: string;
  adresse: string;
  telephone: string;
  bp: string;
  email: string;
  nomPere: string;
  professionPere: string;
  telPere: string;
  nomMere: string;
  professionMere: string;
  telMere: string;
  npi: string;
  educmaster: string;
}

@Component({
  selector: 'app-eleve',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzIconModule,
    NzCardModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
    NzModalModule,
    NzDrawerModule,
  ],
  templateUrl: './eleve.component.html',
  styleUrl: './eleve.component.scss',
})
export class EleveComponent implements OnInit {
  searchInput: string = '';
  datas: Eleve[] = [];
  displayed: Eleve[] = [];

  constructor(
    private service: EleveService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getList().subscribe((res) => {
      this.datas = res;
      this.displayed = this.datas;
    });
  }

  /*create() {
    this.drawer
      .create<FraisFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une cannee scolaire',
        nzContent: FraisFormComponent,
        nzWidth: 500,
        nzData: {
          valueIn: {
            id: null,
            annee:{id:this.cont.anneeId}
          },
        },
      })
      .afterClose.subscribe((data) => {
        if (data) {
          this.datas.push(data);
          this.displayed = [...this.datas];
        }
      });
  }*/

  search() {
    this.displayed = this.datas.filter((d) => {
      return (
        d.nom.toLocaleUpperCase().includes(this.searchInput.toLocaleUpperCase().trim()) ||
        d.sexe.toLocaleUpperCase().includes(this.searchInput.toLocaleUpperCase().trim()) ||
        d.lieuNaissance.toLocaleUpperCase().includes(this.searchInput.toLocaleUpperCase().trim())
      );
    });
  }

  edit(_t52: Eleve) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<EleveFormComponent, { valueIn: Eleve }>({
        nzTitle: 'Modifier l\'élève',
        nzContent: EleveFormComponent,
        nzWidth: 500,
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

  confirmDeleting(_t72: Eleve) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer l\'élève ' + _t72.nom + ' ' /*+ _t72.prenom*/ + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: Eleve) {
    this.service.delete(_t72.id).subscribe((res) => {
      if (res) {
        this.datas.splice(
          this.datas.findIndex((d) => d.id == _t72.id),
          1,
        );
        this.displayed = [...this.datas];
      }
    });
  }
}
