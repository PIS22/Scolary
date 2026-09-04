import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ClasseService } from '../../../../services/classe.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ClasseFormComponent } from './classe-form/classe-form.component';
import { ContexteService } from '../../../../services/contexte.service';
import { Ecole, Site } from '../../etablissement/etablissement.component';
import { Annee } from '../annee/annee.component';
import { Niveau } from '../../param/niveau/niveau.component';
import { ClasselComponent } from './classel/classel.component';

export interface EtablissementAnneeScolaire{
  anneeScolaire: Annee;
  etablissement: Site
}
export interface Classe {
  id: number | null;
  codeClasse: string;
  libClasse: string;
  capacite: number;
  etablissementAnneeScolaire: EtablissementAnneeScolaire;
  niveau: Niveau;
}
@Component({
  selector: 'app-classe',
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
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss',
})
export class ClasseComponent implements OnInit {
  searchInput: string = '';
  datas: Classe[] = [];
  displayed: Classe[] = [];

  sizer = [5, 10, 15, 20]

  constructor(
    private service: ClasseService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    public cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getForEtab(this.cont.etsId, this.cont.anneeId).subscribe((res) => {
      this.datas = res;
      this.displayed = this.datas;
    });
  }

  create() {
    this.drawer
      .create<ClasseFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une classe',
        nzContent: ClasseFormComponent,
        nzWidth: 500,
        nzData: {
          valueIn: {
            id: null,
            codeClasse: '',
            libClasse: '',
            capacite: 0,
            idEtablissement: this.cont.ecoleId,
          },
        },
      })
      .afterClose.subscribe((data) => {
        console.log(data);
        if (data) {
              this.datas.push(data);
          this.displayed = this.datas;
          this.displayed=[...this.datas]
            }
      });
  }
  search() {
    this.displayed = this.datas.filter((d) => {
      return (
        d.codeClasse.includes(this.searchInput) ||
        d.libClasse.includes(this.searchInput) ||
        d.capacite?.toString().includes(this.searchInput)
      );
    });
  }

  edit(_t52: Classe) {
    let ind = this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<ClasseFormComponent, { valueIn: Classe }>({
        nzTitle: 'Modifier la classe',
        nzContent: ClasseFormComponent,

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

  confirmDeleting(_t72: Classe) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' + _t72.libClasse + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: Classe) {
    throw new Error('Method not implemented.');
  }

  popaddingStudent(_t56: Classe) {
    this.drawer.create<ClasselComponent, { valueIn: Classe }>({
      nzContent: ClasselComponent,
      nzData: { valueIn: _t56 },
      nzTitle: "Ajout d'élève à la classe " + _t56.codeClasse,
      nzWidth: 900,
    })
  }

}
