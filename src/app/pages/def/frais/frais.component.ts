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
import { Site } from '../../etablissement/etablissement.component';
import { Annee } from '../annee/annee.component';
import { TypeFrais } from '../../param/type-frais/type-frais.component';
import { FraisService } from '../../../../services/frais.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContexteService } from '../../../../services/contexte.service';
import { FraisFormComponent } from './frais-form/frais-form.component';
import { Niveau } from '../../param/niveau/niveau.component';
import { Classe } from '../classe/classe.component';
import { FraisClassFormComponent } from './frais-class-form/frais-class-form.component';

export interface Frais{
  id: number;
  codeFrais: string;
  libelle: string;
  porte: string;
  montant: number;
  typeFrais: TypeFrais;
  etablissement: Site;
  anneeScolaire: Annee;
}

export interface FraisClasse{
  montant: number;
  frais: Frais;
  classe: Classe;
}


export interface Tranche{
  id: number;
  numTranche: string;
  libtranche: string;
  montant: number;
  dateLimitePaiement: Date;
  frais: Frais;
  classe: Classe;
}

@Component({
  selector: 'app-frais',
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NzIconModule,
      NzCardModule,
      NzInputModule,
      NzTableModule,
      NzButtonModule,
      NzToolTipModule,
      NzModalModule,
    NzDrawerModule,
  ],
  templateUrl: './frais.component.html',
  styleUrl: './frais.component.scss'
})
export class FraisComponent implements OnInit {

  searchInput: string = '';
  datas: Frais[]=[];
  children:any;
  displayed: any;

  constructor(
    private service: FraisService,
    private msg: NzMessageService,
    private drawer: NzDrawerService,
    private cont: ContexteService,
    private modal: NzModalService,
  ) {}

  ngOnInit(): void {
    this.service.getFraisList().subscribe((res) => {
      this.datas = res;
      this.displayed = this.datas;
      console.log(this.displayed);
      this.datas.forEach(e => {
        this.service.getListByFrais(e.id).subscribe(

        )
      })
    });
  }

  create() {
    this.drawer
      .create<FraisFormComponent, { valueIn: any }>({
        nzTitle: 'Créer une cannee scolaire',
        nzContent: FraisFormComponent,
        nzWidth: 600,
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
    /*this.displayed = this.datas.filter((d) => {
      return (
        d.classe.libClasse.includes(this.searchInput) ||
        d.typeFrais.libTypeFrais.includes(this.searchInput)||
        d.typeFrais.libTypeFrais.includes(this.searchInput)||
        d.typeFrais.libTypeFrais.includes(this.searchInput)
      );
    });*/
  }

  edit(_t52: Frais) {
    let ind = this.datas.length+2//this.datas.findIndex((d) => d.id == _t52.id);
    this.drawer
      .create<FraisFormComponent, { valueIn: Frais }>({
        nzTitle: 'Modifier la cannee scolaire',
        nzContent: FraisFormComponent,
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

  confirmDeleting(_t72: Frais) {
    this.modal.confirm({
      nzTitle: 'Confirmation de suppression',
      nzContent:
        '<i>Etes-vous sûr de vouloir supprimer les ' + _t72.libelle + ' pour le compte de  l\'année ' + _t72.anneeScolaire.code+ '?</i>',
      nzCancelText: 'Non',
      nzOnCancel: () => this.msg.info('Action annulée'),
      nzOkText: 'Oui',
      nzOnOk: () => this.delete(_t72),
    });
  }
  delete(_t72: Frais) {
    this.service.delete(_t72.id).subscribe(
      (res) => {
        if (res){
          /*this.datas.splice(this.datas.findIndex(d => d.id == _t72.id), 1);
        this.displayed.splice(this.displayed.findIndex(d=>d.id==_t72.id), 1);*/
          this.displayed = [...this.displayed]
        }
      }
    );
  }

  addChild(_t58: any) {
    this.drawer
      .create<FraisClassFormComponent, { valueIn: Frais }>({
        nzTitle: 'Nouveau frais classe',
        nzContent: FraisClassFormComponent,
        nzWidth: 500,
        nzData: {
          valueIn: _t58,
        },
      })
      .afterClose.subscribe((data) => {
        /*if (data) {
          this.datas[ind] = data;
          this.displayed[ind] = data;
          this.displayed = [...this.displayed];
        }*/
      });
}

}
