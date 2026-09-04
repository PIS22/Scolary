import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Ecole } from '../../etablissement/etablissement.component';
import { CaisseFormeComponent } from './caisse-forme/caisse-forme.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { ContexteService } from '../../../../services/contexte.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { CaisseService } from '../../../../services/caisse.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

export interface Caisse {
  id: number | null;
  codeCaisse: string;
  libCaisse: string;
  etablissement: Ecole;
}
@Component({
  selector: 'app-caisse',
  imports: [
    CommonModule,
    FormsModule,
    NzMenuModule,
    NzCardModule,
    NzIconModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
    NzDrawerModule,
    NzModalModule
  ],
  templateUrl: './caisse.component.html',
  styleUrl: './caisse.component.scss',
})
export class CaisseComponent implements OnInit {
  searchInput: string = '';
  datas: Caisse[] = [];
  displayed: Caisse[] = [];

  constructor(
    private service: CaisseService,
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
      .create<CaisseFormeComponent, { valueIn: any }>({
        nzTitle: 'Créer une caisse',
        nzContent: CaisseFormeComponent,
        nzWidth: 500,
        nzData: {
          valueIn: {
            id: null,
            codeCaisse: '',
            libCaisse: '',
            idEtablissement: this.cont.ecoleId,
          },
        },
      })
      .afterClose.subscribe((data) => {
        if (data) {
              this.datas.push(data);
          this.displayed = [...this.datas];
          if(this.displayed.length==1)
            this.cont.saveAnneeContext(data)

            }
      });
  }
  search() {
    this.displayed = this.datas.filter((d) => {
      return (
        d.codeCaisse.includes(this.searchInput) ||
        d.libCaisse.includes(this.searchInput)
      );
    });
  }

  edit(_t52: Caisse) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<CaisseFormeComponent, { valueIn: Caisse }>({
        nzTitle: 'Modifier la caisse',
        nzContent: CaisseFormeComponent,

        nzData: {
          valueIn: _t52,
        },
      })
      .afterClose.subscribe((data) => {
        if (data) {
          this.datas[ind] = data;
          this.displayed = [...this.datas];
        }
      });
  }

  confirmDeleting(_t72: Caisse) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' + _t72.libCaisse + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: Caisse) {
    throw new Error('Method not implemented.');
  }

}
