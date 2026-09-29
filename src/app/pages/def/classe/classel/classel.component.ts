import { Component, Input, OnInit } from '@angular/core';
import { Classe } from '../classe.component';
import { Inscription } from '../../../inscription/inscription.component';
import { EleveService } from '../../../../../services/eleve.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Detail } from '../../../oper/paiement/paiement.component';

export interface Classement {
  inscription: Inscription;
  observation: string;
  select: boolean;
}
@Component({
  selector: 'app-classel',
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    NzCardModule,
    NzSwitchModule,
    NzInputModule,
    NzDatePickerModule,
    NzTableModule,
    NzMessageModule,
    NzDrawerModule,
    NzButtonModule,
    ReactiveFormsModule
],
  templateUrl: './classel.component.html',
  styleUrl: './classel.component.scss',
})
export class ClasselComponent implements OnInit {
  displayed: Classement[] = [];

  @Input() valueIn!: Classe;
  nonclasse: Classement[] = [];
  searchInput: any;
  dataForm!: FormGroup;

  constructor(
    private service: EleveService,
    private drawer: NzDrawerRef,
    private msg: NzMessageService, private fb: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.init();
    if (this.valueIn) {
      this.service
        .getListSubscriptionByEtabAnneeNiveau(
          this.valueIn.etablissementAnneeScolaire.etablissement.id,
          this.valueIn.etablissementAnneeScolaire.anneeScolaire.id,
          this.valueIn.niveau.code,
        )
        .subscribe((resp) => {
          this.nonclasse = resp.map((i) => {
            return { inscription: i, observation: '', select: false };
          });
          this.displayed = this.nonclasse;
        });
    }
  }

  init(){
    this.dataForm = this.fb.group({
      dat: [new Date(), Validators.required],
      val: ['']
    })
  }

  dispatch() {
    console.log(this.dataForm.value.Detail+' '+this.nonclasse[0].observation);
    
    let body = this.nonclasse
      .filter((l) => l.select)
      .map((l) => {
        return {
          dateAffectation: this.dataForm.value.dat,
          dateFinAffectation: null,
          observation: l.observation,
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
