import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Caisse } from '../../../def/caisse/caisse.component';
import { ModeReglement } from '../../../man/mode-reg/mode-reg.component';
import { CaisseService } from '../../../../../services/caisse.service';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { ContexteService } from '../../../../../services/contexte.service';
import { Detail, Paiement } from '../paiement.component';
import { EleveService } from '../../../../../services/eleve.service';
import { Inscription } from '../../../inscription/inscription.component';
import { Frais } from '../../../def/frais/frais.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { FraisSelectComponent } from '../../../def/frais/frais-select/frais-select.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';


@Component({
  selector: 'app-paiement-form',
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzModalModule,
    NzInputModule,
    NzButtonModule,
    NzCardModule,
    NzToolTipModule,
    NzFormModule,
    NzGridModule,
    NzSelectModule,
    NzTableModule
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
  fraisDus: Detail[] = [];
  displayed: Detail[] = [];

  constructor(
    private fb: FormBuilder,
    private service: CaisseService, private eleser: EleveService,
    private ref: NzDrawerRef, private mod: NzDrawerService,
    private cont: ContexteService, private cdr: ChangeDetectorRef
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
    let hr: Date = this.dataForm.value.tim;
    let rf = String(hr.getHours()).padStart(2, '0') + ':' + String(hr.getMinutes()).padStart(2, '0');

    let body: any = {
      id: this.dataForm.value.id?this.dataForm.value.id: null,
      datePaiement: this.dataForm.value.dat,
      heurePaiement: rf,
      numCheque: this.dataForm.value.ref,
      datecheque: this.dataForm.value.dre,
      nomPayeur: this.dataForm.value.pay,
      numInscription: this.dataForm.value.ins,
      rang: 0,
      idCaisse: this.dataForm.value.cai,
      idModeReglement: this.dataForm.value.mop,
      details: this.displayed.filter(d => d.prixUnitaire > 0).map(l => { return {idFrais: l.frais.id, quantite: l.quantite, prixUnitaire:l.prixUnitaire}; })
    };
    console.log(body)
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

  getFees(obj: Inscription) {
    console.log(obj);
    this.mod.create<FraisSelectComponent, { inputData: Inscription }>({
      nzData: { inputData: obj },
      nzContent: FraisSelectComponent,
      nzTitle: 'Choix des fais',
      nzWidth: 650,
      nzPlacement:'bottom'
    }).afterClose.subscribe(
      (data: Frais[]) => {
        if (data)
        if(data.length > 0){
        console.log(data);
        data.forEach(dt  => {
          if (!this.fraisDus.find(f => f.frais.id == dt.id))
            this.fraisDus.push({id: dt? dt.id: null, quantite:1, prixUnitaire: 0, frais: dt})
        });
        //this.fraisDus = data.map(d=>{return });
        this.displayed = [...this.fraisDus];
        console.log(this.displayed);
        this.cdr.detectChanges();

        }
      }
    )
  }

  initForm() {
    this.dataForm = this.fb.group({
      id: [this.valueIn ? this.valueIn.id : null],
      dat: [this.valueIn ? this.valueIn.datePaiement : null],
      tim: [this.valueIn ? this.valueIn.heurePaiement : null],
      pay: [this.valueIn ? this.valueIn.nomPayeur : null],
      ref: [this.valueIn ? this.valueIn.numCheque : 0],
      dre: [this.valueIn ? this.valueIn.dateCheque : null],
      mop: [this.valueIn ? this.valueIn.idModeReglement : null],
      cai: [this.valueIn ? this.valueIn.idCaisse : 0],
      ins: [this.valueIn ? this.valueIn.numInscriprion : 0],
    });
  }
}
