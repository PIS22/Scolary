import { CommonModule, DatePipe } from '@angular/common';
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
import { ClasselComponent, Classement } from './classel/classel.component';
import { EleveService } from '../../../../services/eleve.service';
import { Inscription } from '../../inscription/inscription.component';
import { ClassElEditorComponent } from './class-el-editor/class-el-editor.component';

export interface AffectationEleve {
  id: number;
  inscription: Inscription;
  classe: Classe;
  dateAffectation: Date;
  observation: string;
}
interface enClasse{
  expanded: boolean;
  classe: Classe;
  liste: AffectationEleve[];
}
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
    NzDrawerModule, DatePipe
  ],
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss',
})
export class ClasseComponent implements OnInit {
  showMembers(_t60: enClasse) {
    if(_t60.classe.id ){
  _t60.expanded = !_t60.expanded;
  if (_t60.expanded) {
    this.datas.forEach(e => {
      if (e.classe != _t60.classe)
        e.expanded = false;
    })
    this.elser.getListEleveForClasse(_t60.classe.id ).subscribe(
      (list) => {
        _t60.liste = list;
        console.log(_t60.liste);

      }
    )
  }}
}
printInfo(_t57: Classe): string {
  if (_t57)
    return 'Imprimer la liste des enfnats de ' + _t57.codeClasse
  else return '';
}
printList(_t57: Classe) {
throw new Error('Method not implemented.');
}
  searchInput: string = '';
  datas: enClasse[] = [];
  displayed: enClasse[] = [];

  sizer = [5, 10, 15, 20]

  constructor(
    private service: ClasseService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private elser: EleveService,
    public cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getForEtab(this.cont.etsId, this.cont.anneeId).subscribe((res) => {
      this.datas = res.map(r=>{return {expanded:false, classe: r, liste: []}});
      this.displayed = this.datas;
    });
  }

  create() {
    this.drawer
      .create<ClasseFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une classe',
        nzContent: ClasseFormComponent,
        nzWidth: 600,
        nzData: {
          valueIn: {
            id: null,///0196123241     MR NAMBOY
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
              this.datas.push({expanded: false, classe:data, liste: []});
          this.displayed = this.datas;
          this.displayed=[...this.datas]
            }
      });
  }

  search() {
    this.displayed = this.datas.filter((d) => {
      return (
        d.classe.codeClasse.includes(this.searchInput) ||
        d.classe.libClasse.includes(this.searchInput) ||
        d.classe.capacite?.toString().includes(this.searchInput)
      );
    });
  }

  edit(_t52: Classe) {
    let ind = this.datas.findIndex((d) => d.classe.id == _t52.id);
    this.drawer
      .create<ClasseFormComponent, { valueIn: Classe }>({
        nzTitle: 'Modifier la classe',
        nzContent: ClasseFormComponent,
        nzWidth: 500,
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
        '<i>Etes-vous sûr de vouloir supprimer la classe de ' + _t72.libClasse + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }

  delete(_t72: Classe) {
    throw new Error('Method not implemented.');
  }

  confirmDeletEleveClasse(_t72: AffectationEleve) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer ' + _t72.inscription.eleve.nom + ' dec la classe de ' + _t72.classe.libClasse + '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.deleteEleveClasse(_t72),
    });
  }

  deleteEleveClasse(_t72: AffectationEleve) {
    this.elser.deleteEleveClasse(_t72.id).subscribe(
      (res) => {
        console.log(res);
      }
    )
  }


finirAffectation(_t166: AffectationEleve) {
throw new Error('Method not implemented.');
}

  popaddingStudent(_t56: Classe) {
    this.drawer.create<ClasselComponent, { valueIn: Classe }>({
      nzContent: ClasselComponent,
      nzData: { valueIn: _t56 },
      nzTitle: "Ajout d'élève à la classe " + _t56.codeClasse,
      nzWidth: 1000,
    }).afterClose.subscribe(
      (data) => {
        console.log(data);

      }
    )
  }

  editAffectation(_t56: AffectationEleve) {
    this.drawer.create<ClassElEditorComponent, { valueIn: AffectationEleve }>({
      nzContent: ClassElEditorComponent,
      nzData: { valueIn: _t56 },
      nzTitle: "Modifoer affectatiob d'élève ",
      nzWidth: 500,
    }).afterClose.subscribe(
      (data) => {
        console.log(data);

      }
    )
  }

}
