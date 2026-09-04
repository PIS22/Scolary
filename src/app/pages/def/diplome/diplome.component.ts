import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ContexteService } from '../../../../services/contexte.service';
import { DiplomeFormComponent } from './diplome-form/diplome-form.component';
import { DiplomeService } from '../../../../services/diplome.service';

export interface Diplome {
  id: number;
  codeDiplome: string;
  libDiplome: string;
}

@Component({
  selector: 'app-diplome',
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
  templateUrl: './diplome.component.html',
  styleUrl: './diplome.component.scss'
})
export class DiplomeComponent implements OnInit {
  searchInput: string = '';
  datas: Diplome[] = [];
  displayed: Diplome[] = [];

  constructor(
    private service: DiplomeService,
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
      .create<DiplomeFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une cannee scolaire',
        nzContent: DiplomeFormComponent,
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
        d.codeDiplome.includes(this.searchInput) ||
        d.libDiplome.includes(this.searchInput)
      );
    });
  }

  edit(_t52: Diplome) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<DiplomeFormComponent, { valueIn: Diplome }>({
        nzTitle: 'Modifier la cannee scolaire',
        nzContent: DiplomeFormComponent,
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

  confirmDeleting(_t72: Diplome) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' + _t72.libDiplome + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: Diplome) {
    this.service.delete(_t72.id).subscribe(
      (res) => {
        if (res){
          this.datas.splice(this.datas.findIndex(d => d.id == _t72.id), 1);
        this.displayed.splice(this.displayed.findIndex(d=>d.id==_t72.id), 1);
          this.displayed = [...this.displayed]
        }
      }
    );
  }

}

