import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { AnneeFormComponent } from './annee-form/annee-form.component';
import { AnneeService } from '../../../../services/annee.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { ContexteService } from '../../../../services/contexte.service';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { rxResource } from '@angular/core/rxjs-interop';

export interface Annee {
  id: number;
  code: string;
  libelle: string;
  dateDeb: Date;
  dateFin: Date;
  etat: 'PREPARATION'|'EN_COURS'|'TERMINEE'|'ARCHIVEE';
}

@Component({
  selector: 'app-annee',
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
  templateUrl: './annee.component.html',
  styleUrl: './annee.component.scss',
})
export class AnneeComponent implements OnInit {
  openAnnee(_t61: Annee) {
    this.cont.saveAnneeContext(_t61);
  }
  searchInput: string = '';
  datas: Annee[] = [];
  displayed: Annee[] = [];

  constructor(
    private service: AnneeService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getEtanForEtab(this.cont.etsId).subscribe((re) => {
      this.datas = re.map((r) => {
        return r.anneeScolaire;
      });
      this.displayed = this.datas;
      if (
        !this.datas.find((d) => {
          return d.id == this.cont.anneeId;
        })
      )
        this.service.getLastEtanForEtab(this.cont.etsId).subscribe((res) => {
          if (res) this.cont.saveAnneeContext(res.anneeScolaire);
          else this.cont.clearAnneeContext();
        });
    });
  }

  create() {
    this.drawer
      .create<AnneeFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une année scolaire',
        nzContent: AnneeFormComponent,
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
          console.log(data)
          if (data.etat=='PREPARATION'||data.etat=='EN_COURS') {
            let etas={
                idEtablissement: this.cont.etsId,
                idAnneeScolaire: data.id,
                dateOuverture: data.dateDeb,
                dateFermeture: null,
                motif: null,
                etat: 'OUVERTE',
                generationAutomatiqueNumeroInscription: true,
            }
            console.log(etas)
            this.service
              .createEtan(etas)
              .subscribe((re) => {
                console.log(re);
                if (re) {
                  this.cont.saveAnneeContext(re.anneeScolaire);
                  this.datas.push(data);
                  this.displayed = [...this.datas];
                  this.displayed=[...this.displayed]
                }
              });
          }
        }
      });
  }

  search() {
    this.displayed = this.datas.filter((d) => {
      return (
        d.code.includes(this.searchInput) ||
        d.libelle.includes(this.searchInput) ||
        d.dateDeb.toDateString().includes(this.searchInput) ||
        d.dateFin.toDateString().includes(this.searchInput)
      );
    });
  }

  edit(_t52: Annee) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<AnneeFormComponent, { valueIn: Annee }>({
        nzTitle: 'Modifier la année scolaire',
        nzContent: AnneeFormComponent,
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

  confirmDeleting(_t72: Annee) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer l\'' + _t72.libelle + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: Annee) {
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
