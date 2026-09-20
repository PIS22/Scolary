import { Component, Input, OnInit } from '@angular/core';
import { Classe } from '../classe.component';
import { Inscription } from '../../../inscription/inscription.component';
import { EleveService } from '../../../../../services/eleve.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';

export interface Classement {
  inscription: Inscription;
  select: boolean;
}
@Component({
  selector: 'app-classel',
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    NzCardModule,
    NzSwitchModule,
    NzInputModule,
    NzTableModule,
    NzMessageModule,
    NzDrawerModule,
    NzButtonModule,
  ],
  templateUrl: './classel.component.html',
  styleUrl: './classel.component.scss',
})
export class ClasselComponent implements OnInit {
  displayed: Classement[] = [];

  @Input() valueIn!: Classe;
  nonclasse: Classement[] = [];
  searchInput: any;

  constructor(
    private service: EleveService,
    private drawer: NzDrawerRef,
    private msg: NzMessageService,
  ) {}
  ngOnInit(): void {
    if (this.valueIn) {
      this.service
        .getListSubscriptionByEtabAnneeNiveau(
          this.valueIn.etablissementAnneeScolaire.etablissement.id,
          this.valueIn.etablissementAnneeScolaire.anneeScolaire.id,
          this.valueIn.niveau.code,
        )
        .subscribe((resp) => {
          this.nonclasse = resp.map((i) => {
            return { inscription: i, select: false };
          });
          this.displayed = this.nonclasse;
        });
    }
  }

  dispatch() {
    let body = this.nonclasse
      .filter((l) => l.select)
      .map((l) => {
        return {
          dateAffectation: new Date(),
          dateFinAffectation: null,
          observation: null,
          idInscription: l.inscription.id,
          idClasse: this.valueIn.id,
          courante: true,
        };
      });
    this.service.createEleveClasseList(body).subscribe(
      (res) => {
        if (res.length > 0) this.drawer.close(res);
        else this.drawer.close(null);
      },
      (err) => {
        this.msg.warning('Classement non effectué:  ' + err);
        this.drawer.close(null);
      },
    );
  }

  search() {
    console.log(this.searchInput);
  }
}
