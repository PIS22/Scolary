import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Caisse } from '../../../def/caisse/caisse.component';
import { ModeReglement } from '../../../man/mode-reg/mode-reg.component';
import { ClasseService } from '../../../../../services/classe.service';
import { CaisseService } from '../../../../../services/caisse.service';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { ContexteService } from '../../../../../services/contexte.service';
import { Paiement } from '../paiement.component';
import { EleveService } from '../../../../../services/eleve.service';
import { Inscription } from '../../../inscription/inscription.component';
import { Frais } from '../../../def/frais/frais.component';
import { ɵNzSiderTriggerComponent } from "ng-zorro-antd/layout";
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { FraisSelectComponent } from '../../../def/frais/frais-select/frais-select.component';
import { config } from 'rxjs';

@Component({
  selector: 'app-paiement-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzToolTipModule,
    NzFormModule,
    NzSelectModule,
],
  templateUrl: './paiement-form.component.html',
  styleUrl: './paiement-form.component.scss'
})
export class PaiementFormComponent  implements OnInit {
  @Input() valueIn!: any;
  dataForm!: FormGroup;
  caisses: Caisse[] = [];
  modes: ModeReglement[] = [];
  inscrits: Inscription[] = [];
  frais: Frais[] = [];

  constructor(
    private fb: FormBuilder,
    private service: CaisseService, private eleser: EleveService,
    private ref: NzDrawerRef, private mod: NzDrawerService,
    private cont: ContexteService,
  ) { }

  ngOnInit(): void {
    this.service.getList().subscribe((res) => {
      this.caisses = res;
    });
    this.service.getModeList().subscribe((res) => {
      this.modes = res;
    });
    if (this.cont.etsId && this.cont.anneeId)
      this.eleser.getListSubscriptionByEtabAnnee(this.cont.etsId, this.cont.anneeId).subscribe(
        (res) => {
          this.inscrits=res
      })
    this.initForm();
  }

  close(valueOut: Paiement | null) {
    this.ref.close(valueOut);
  }

  submit() {
    let body = {
      id: this.dataForm.value.id,
      codeClasse: this.dataForm.value.code,
      libClasse: this.dataForm.value.libe,
      capacite: this.dataForm.value.cap,
      idNiveau: this.dataForm.value.niv,
      idAnneeScolaire: this.cont.anneeId,
      idEtablissement: this.cont.etsId,
    };
    if (body.id) {
      this.service.editPaiement(body).subscribe(
        (res) => {
          if (res) this.close(res);
          else this.close(null);
        },
        (err) => {
          /*eau de coco 1L +ail triture+ citron+sel à laisser jusqu'au lendemain.
          se rincer le corps avec après la douche matin et soir pendant 3 jours*/
          this.close(null);
        },
      );
    } else {
      this.service.createPaiement(body).subscribe(
        (res) => {
          if (res && res.id) this.close(res);
          else {
            console.log(res);
            this.close(null);
          }
        },
        (err) => {
          this.close(null);
        },
      );
    }
  }

  getFees(obj: any) {console.log(obj);
    this.mod.create<FraisSelectComponent, { inputData: string }>({
      nzData: { inputData: obj },
      nzContent: FraisSelectComponent,
      nzTitle: 'Choix des fais',
      nzWidth: 650,
      nzPlacement:'left'
    }).afterClose.subscribe(
      (data) => {
        console.log(data);
      }
    )
  }

  initForm() {
    this.dataForm = this.fb.group({
      id: [this.valueIn ? this.valueIn.id : null],
      dat: [this.valueIn ? this.valueIn.datePaiement : null],
      pay: [this.valueIn ? this.valueIn.nomPayeur : null],
      ref: [this.valueIn ? this.valueIn.numCheque : 0],
      dre: [this.valueIn ? this.valueIn.dateCheque : null],
      mop: [this.valueIn ? this.valueIn.idModeReglement : null],
      cai: [this.valueIn ? this.valueIn.idCaisse : 0],
      ins: [this.valueIn ? this.valueIn.numInscriprion : 0],
    });
  }
}
