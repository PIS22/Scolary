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
import { Eleve } from '../../def/eleve/eleve.component';
import { Classe } from '../../def/classe/classe.component';
import { EleveService } from '../../../../services/eleve.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContexteService } from '../../../../services/contexte.service';
import { FormComponent } from './form/form.component';

export interface AffectionEleve {
  id: number;
  eleve: Eleve;
  classe: Classe;
  dateAffectation: Date;
}

@Component({
  selector: 'app-eleve-classe',
  imports: [
    ReactiveFormsModule,
    NzToolTipModule,
    NzButtonModule,
    NzDrawerModule,
    CommonModule,
    FormsModule,
    NzInputModule,
    NzIconModule,
    NzCardModule,
    NzInputModule,
    NzTableModule,
    NzModalModule,
  ],
  templateUrl: './eleve-classe.component.html',
  styleUrl: './eleve-classe.component.scss',
})
export class EleveClasseComponent implements OnInit {
  searchInput: string = '';
  datas: AffectionEleve[] = [];
  displayed: AffectionEleve[] = [];

  constructor(
    private service: EleveService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getListEleveClasse().subscribe((res) => {
      this.datas = res;
      this.displayed = this.datas;
      console.log(this.displayed);
    });
  }

  create() {
    this.drawer
      .create<FormComponent, { valueIn: any }>({
        nzTitle: 'Créer une affectation d\'élève',
        nzContent: FormComponent,
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
        d.classe.libClasse.includes(this.searchInput) ||
        d.eleve.nom.includes(this.searchInput)
      );
    });
  }

  edit(_t52: AffectionEleve) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<FormComponent, { valueIn: AffectionEleve }>({
        nzTitle: 'Modifier l\'affectation d\'élève',
        nzContent: FormComponent,
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

  confirmDeleting(_t72: AffectionEleve) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' + _t72.classe.libClasse + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: AffectionEleve) {
    this.service.delete(_t72.id).subscribe((res) => {
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
