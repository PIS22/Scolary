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
import { CaisseService } from '../../../../services/caisse.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContexteService } from '../../../../services/contexte.service';
import { PaiementFormComponent } from './paiement-form/paiement-form.component';
import { Caisse } from '../../def/caisse/caisse.component';
import { Inscription } from '../../inscription/inscription.component';
import { ModeReglement } from '../../man/mode-reg/mode-reg.component';
import { Frais } from '../../def/frais/frais.component';

export interface Paiement {
  id: number;
  datePaiement: Date;
  numRecu: string;
  nomPayeur: string;
  numCheque: string;
  dateCheque: Date;
  rang: number;
  valider: boolean;
  montantTotal: number;
  modeReglement: ModeReglement;
  caisse: Caisse;
  inscription: Inscription;
  details: Detail[]
}

export interface Detail {
  id: number|null;
  quantite: number;
  prixUnitaire: number;
  frais: Frais;
}

interface Transaction{
  expanded: boolean;
  paiement: Paiement;
}

@Component({
  selector: 'app-paiement',
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
  templateUrl: './paiement.component.html',
  styleUrl: './paiement.component.scss',
})
export class PaiementComponent implements OnInit {
showDetail(arg0: Paiement) {
throw new Error('Method not implemented.');
}
  searchInput: string = '';
  datas: Transaction[] = [];
  displayed: Transaction[] = [];

  constructor(
    private service: CaisseService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getListPaiement().subscribe((res) => {
      this.datas = res.map(r => { return { expanded: false, paiement: r }; });
      this.displayed = this.datas;
      console.log(this.displayed);
    });
  }

  create() {
    this.drawer
      .create<PaiementFormComponent, { valueIn: any }>({
        nzTitle: 'Créer un paiement',
        nzContent: PaiementFormComponent,
        nzWidth: 750,
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
      return d;
      /*d.codeMatiere.includes(this.searchInput) ||
        d.libMatiere.includes(this.searchInput)*/
    });
  }

  edit(_t52: Paiement) {
    let ind = this.datas.findIndex((d) => d.paiement.id == _t52.id);
    this.drawer
      .create<PaiementFormComponent, { valueIn: Paiement }>({
        nzTitle: 'Modifier le paiement',
        nzContent: PaiementFormComponent,
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

  confirmDeleting(_t72: Paiement) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' /*+ _t72.libMatiere*/ +
        '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: Paiement) {
    this.service.deletePaiement(_t72.id).subscribe((res) => {
      console.log(res);
      if (res)
        this.datas.splice(
          this.datas.findIndex((d) => d.paiement.id == _t72.id),
          1,
        );
      this.displayed = [...this.datas];
    });
  }
}
