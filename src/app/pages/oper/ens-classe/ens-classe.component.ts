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
import { EnseignerClasse } from '../../def/enseignant/enseignant.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EnseignantService } from '../../../../services/enseignant.service';
import { ContexteService } from '../../../../services/contexte.service';
import { FormECComponent } from './form-ec/form-ec.component';

@Component({
  selector: 'app-ens-classe',
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
    NzDrawerModule
  ],
  templateUrl: './ens-classe.component.html',
  styleUrl: './ens-classe.component.scss'
})
export class EnsClasseComponent implements OnInit {
  searchInput: string = '';
  datas: EnseignerClasse[] = [];
  displayed: EnseignerClasse[] = [];

  constructor(
    private service: EnseignantService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getListEnseignerClasse().subscribe((res) => {
      this.datas = res;
      this.displayed = this.datas;
      console.log(this.displayed);
    });
  }

  create() {
    this.drawer
      .create<FormECComponent, { valueIn: any }>({
        nzTitle: 'Créer une cannee scolaire',
        nzContent: FormECComponent,
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
        d.enseignant.nom.includes(this.searchInput)
      );
    });
  }

  edit(_t52: EnseignerClasse) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<FormECComponent, { valueIn: EnseignerClasse }>({
        nzTitle: 'Modifier la cannee scolaire',
        nzContent: FormECComponent,
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

  confirmDeleting(_t72: EnseignerClasse) {
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
  delete(_t72: EnseignerClasse) {
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
