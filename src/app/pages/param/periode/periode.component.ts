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
import { Periode } from '../../welcome/welcome.component';
import { AnneeService } from '../../../../services/annee.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContexteService } from '../../../../services/contexte.service';
import { PeriodeFormComponent } from './periode-form/periode-form.component';
/*export interface Periode{
  id: number;
  code: string;
  libelle: string;
  dateDebut: Date;
  dateFin: Date;
  ordre: number;
  etablissemenAnneeScolaire: Eta
}*/
@Component({
  selector: 'app-periode',
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
    DatePipe,
  ],
  templateUrl: './periode.component.html',
  styleUrl: './periode.component.scss',
})
export class PeriodeComponent implements OnInit {
  searchInput: string = '';
  datas: Periode[] = [];
  displayed: Periode[] = [];

  constructor(
    private service: AnneeService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getListPeriode().subscribe((res) => {
      this.datas = res;
      this.displayed = this.datas;
      console.log(this.displayed);
    });
  }

  create() {
    this.drawer
      .create<PeriodeFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une cannee scolaire',
        nzContent: PeriodeFormComponent,
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
          this.service
            .createEta({
              etablisseId: this.cont.etsId,
              anneeScolaireId: this.cont.anneeId,
            })
            .subscribe((res) => {});
          this.datas.push(data);
          this.displayed = [...this.datas];
          if (this.datas.length == 1) this.cont.saveAnneeContext(data);
          this.service
            .createEta({
              etablisseId: this.cont.etsId,
              anneeScolaireId: this.cont.anneeId,
            })
            .subscribe((res) => {});
        }
      });
  }

  search() {
    this.displayed = this.datas.filter((d) => {
      return (
        d.code.includes(this.searchInput) ||
        d.libelle.includes(this.searchInput) ||
        d.dateDebut.toDateString().includes(this.searchInput) ||
        d.dateFin.toDateString().includes(this.searchInput)
      );
    });
  }

  edit(_t52: Periode) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<PeriodeFormComponent, { valueIn: Periode }>({
        nzTitle: 'Modifier la cannee scolaire',
        nzContent: PeriodeFormComponent,
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
          if (this.datas.length == 1) this.cont.saveAnneeContext(data);
        }
      });
  }

  confirmDeleting(_t72: Periode) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' + _t72.libelle + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: Periode) {
    this.service.delete(_t72.id).subscribe((res) => {
      if (res) {
        this.datas.splice(
          this.datas.findIndex((d) => d.id == _t72.id),
          1,
        );
        this.displayed.splice(
          this.displayed.findIndex((d) => d.id == _t72.id),
          1,
        );
        this.displayed = [...this.datas];
      }
    });
  }
}
