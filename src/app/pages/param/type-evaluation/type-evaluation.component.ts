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
import { TypFormComponent } from './typ-form/typ-form.component';
import { EvalService } from '../../../../services/eval.service';
import { Eleve } from '../../def/eleve/eleve.component';
import { Matiere } from '../../def/matiere/matiere.component';
import { AffectionEleve } from '../../oper/eleve-classe/eleve-classe.component';
import { Periode } from '../../welcome/welcome.component';

export interface TypeEval {
  id: number;
  libTypeEva: string;
}

export interface Evaluation{
  id: number;
  typeEval: TypeEval;
  dateDeb: Date;
  dateFin:Date;
  libelle: string;
  periode: Periode;
}

export interface Note{
  id: number;
  matiere: Matiere;
  affectationEleve: AffectionEleve;
  evaluation: Evaluation
  note: number;
  noteSur: number;
  observation: string;
  statutNote: string;
}

@Component({
  selector: 'app-type-evaluation',
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
    NzDrawerModule],
  templateUrl: './type-evaluation.component.html',
  styleUrl: './type-evaluation.component.scss'
})
export class TypeEvaluationComponent implements OnInit {
  searchInput: string = '';
  datas: TypeEval[] = [];
  displayed: TypeEval[] = [];

  constructor(
    private service: EvalService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getListType().subscribe((res) => {
      this.datas = res;
      this.displayed = this.datas;
      console.log(this.displayed);
    });
  }

  create() {
    this.drawer
      .create<TypFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une cannee scolaire',
        nzContent: TypFormComponent,
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
        d.libTypeEva.includes(this.searchInput)
      );
    });
  }

  edit(_t52: TypeEval) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<TypFormComponent, { valueIn: TypeEval }>({
        nzTitle: 'Modifier la cannee scolaire',
        nzContent: TypFormComponent,
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

  confirmDeleting(_t72: TypeEval) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' + _t72.libTypeEva + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: TypeEval) {
    this.service.deleteType(_t72.id).subscribe(
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
