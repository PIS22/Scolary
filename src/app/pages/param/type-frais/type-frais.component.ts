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
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContexteService } from '../../../../services/contexte.service';
import { TfFormComponent } from './tf-form/tf-form.component';

export interface TypeFrais {
  id: number;
  codeTypeFrais: string;
  libTypeFrais: string;
  montant: number;
}

@Component({
  selector: 'app-type-frais',
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
  templateUrl: './type-frais.component.html',
  styleUrl: './type-frais.component.scss',
})
export class TypeFraisComponent implements OnInit {
  searchInput: string = '';
  datas: TypeFrais[] = [];
  displayed: TypeFrais[] = [];

  constructor(
    private service: FraisService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getListTypeFrais().subscribe((res) => {
      this.datas = res;
      this.displayed = this.datas;
    });
  }

  create() {
    this.drawer
      .create<TfFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une cannee scolaire',
        nzContent: TfFormComponent,
        nzWidth: 500,
        nzData: {
          valueIn: null
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
        d.codeTypeFrais.includes(this.searchInput) ||
        d.libTypeFrais.includes(this.searchInput)
      );
    });
  }

  edit(_t52: TypeFrais) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<TfFormComponent, { valueIn: TypeFrais }>({
        nzTitle: 'Modifier la cannee scolaire',
        nzContent: TfFormComponent,
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

  confirmDeleting(_t72: TypeFrais) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' + _t72.libTypeFrais + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: TypeFrais) {
    this.service.deleteTypeFrais(_t72.id).subscribe((res) => {
      console.log(res);
      if (res)
        this.datas.splice(
          this.datas.findIndex((d) => d.id == _t72.id),
          1,
        );
      this.displayed.splice(
        this.displayed.findIndex((d) => d.id == _t72.id),
        1,
      );
      this.displayed = [...this.displayed];
    });
  }
}
