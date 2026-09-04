import { CommonModule, DatePipe } from '@angular/common';
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
import { Tranche } from '../frais/frais.component';
import { FraisService } from '../../../../services/frais.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContexteService } from '../../../../services/contexte.service';
import { TrancheFormComponent } from './tranche-form/tranche-form.component';

@Component({
  selector: 'app-tranche',
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
    DatePipe
  ],
  templateUrl: './tranche.component.html',
  styleUrl: './tranche.component.scss'
})
export class TrancheComponent implements OnInit {
  searchInput: string = '';
  datas: Tranche[] = [];
  displayed: Tranche[] = [];

  constructor(
    private service: FraisService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getListTrancheFrais().subscribe((res) => {
      this.datas = res;
      this.displayed = this.datas;
      console.log(this.displayed);
    });
  }

  create() {
    this.drawer
      .create<TrancheFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une Tranche',
        nzContent: TrancheFormComponent,
        nzWidth: 500,
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
        d.numTranche.includes(this.searchInput) ||
        d.libtranche.includes(this.searchInput)||
        d.frais.libelle.includes(this.searchInput) ||
        d.classe.libClasse.includes(this.searchInput) ||
        d.montant.toString().includes(this.searchInput) 
      );
    });
  }

  edit(_t52: Tranche) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<TrancheFormComponent, { valueIn: Tranche }>({
        nzTitle: 'Modifier la tranche',
        nzContent: TrancheFormComponent,
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

  confirmDeleting(_t72: Tranche) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' + _t72.libtranche + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: Tranche) {
    this.service.delete(_t72.id).subscribe(
      (res) => {
        console.log(res);
        if (res)
          this.datas.splice(this.datas.findIndex(d => d.id == _t72.id), 1);
        this.displayed.splice(this.displayed.findIndex(d=>d.id==_t72.id), 1);
        this.displayed=[...this.displayed]
      }
    );
  }

}
