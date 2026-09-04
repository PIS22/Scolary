import { Component, OnInit } from '@angular/core';
import { Ecole, Site } from '../../etablissement/etablissement.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContexteService } from '../../../../services/contexte.service';
import { ModeFormComponent } from './mode-form/mode-form.component';
import { ModeReglementService } from '../../../../services/mode.service';

export interface ModeReglement {
  id: number | null;
  libMode: string;
  etablissement: Site;
}
@Component({
  selector: 'app-mode-reg',
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
  templateUrl: './mode-reg.component.html',
  styleUrl: './mode-reg.component.scss',
})
export class ModeRegComponent implements OnInit {
  searchInput: string = '';
  datas: ModeReglement[] = [];
  displayed: ModeReglement[] = [];

  constructor(
    private service: ModeReglementService,
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

  create() {
    this.drawer
      .create<ModeFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une mode de règlement',
        nzContent: ModeFormComponent,
        nzWidth: 500,
        nzData: {
          valueIn: {
            id: null,
            libMode: '',
            idEtablissement: this.cont.ecoleId,
          },
        },
      })
      .afterClose.subscribe((data) => {
        console.log(data);
        if (data) {
          this.datas.push(data);
          this.displayed = this.datas;
          this.displayed = [...this.displayed];
        }
      });
  }
  search() {
    this.displayed = this.datas.filter((d) => {
      return d.libMode.includes(this.searchInput);
    });
  }

  edit(_t52: ModeReglement) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<ModeFormComponent, { valueIn: ModeReglement }>({
        nzTitle: 'Modifier la mode de règlement',
        nzContent: ModeFormComponent,

        nzData: {
          valueIn: _t52,
        },
      })
      .afterClose.subscribe((data) => {
        if (data) {
          this.datas[ind] = data;
          this.displayed = this.datas;
          this.displayed = this.displayed;
        }
      });
  }

  confirmDeleting(_t72: ModeReglement) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' + _t72.libMode + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: ModeReglement) {
    throw new Error('Method not implemented.');
  }
}
