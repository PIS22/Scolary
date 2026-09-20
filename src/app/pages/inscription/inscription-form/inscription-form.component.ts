import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ContexteService } from '../../../../services/contexte.service';
import { ClasseService } from '../../../../services/classe.service';
import { EleveService } from '../../../../services/eleve.service';
import { Niveau } from '../../param/niveau/niveau.component';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Inscription, Statuts } from '../inscription.component';
import { Eleve } from '../../def/eleve/eleve.component';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-inscription-form',
  imports: [
    CommonModule,
    NzFormModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzSpaceModule,
    NzGridModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzGridModule,
    NzToolTipModule,
    NzDividerModule,
    NzDrawerModule,
  ],
  templateUrl: './inscription-form.component.html',
  styleUrl: './inscription-form.component.scss',
})
export class InscriptionFormComponent implements OnInit {
  @Input() valueIn!: any;
  dataForm!: FormGroup;
  ins = true;
  niveaux: Niveau[] = [];
  info = '';
  eleve!: Eleve | null;
  statuts = Statuts;

  refresh() {
    if (!this.dataForm.value.typ) {
    this.info = 'Allumez pour inscrire un nouvel élève';
      this.dataForm.get('nom')?.disable();
      this.dataForm.get('npi')?.disable();
      this.dataForm.get('lin')?.disable();
      this.dataForm.get('dan')?.disable();
      this.dataForm.get('sex')?.disable();
      this.dataForm.get('edu')?.disable();
      this.dataForm.get('ema')?.disable();
      this.dataForm.get('tel')?.disable();
      this.dataForm.get('adr')?.disable();
      this.dataForm.get('nomp')?.disable();
      this.dataForm.get('prop')?.disable();
      this.dataForm.get('telp')?.disable();
      this.dataForm.get('telm')?.disable();
      this.dataForm.get('prom')?.disable();
      this.dataForm.get('nomm')?.disable();
    } else {
      this.info = 'Eteignez pour réinscrire un ancien élève';
      if (this.valueIn) {
        this.dataForm.get('nom')?.disable();
      this.dataForm.get('npi')?.disable();
      this.dataForm.get('lin')?.disable();
      this.dataForm.get('dan')?.disable();
      this.dataForm.get('sex')?.disable();
      this.dataForm.get('edu')?.disable();
      this.dataForm.get('ema')?.disable();
      this.dataForm.get('tel')?.disable();
      this.dataForm.get('adr')?.disable();
      this.dataForm.get('nomp')?.disable();
      this.dataForm.get('prop')?.disable();
      this.dataForm.get('telp')?.disable();
      this.dataForm.get('telm')?.disable();
      this.dataForm.get('prom')?.disable();
      this.dataForm.get('nomm')?.disable();
      } else {
        this.dataForm.get('nom')?.enable();
      this.dataForm.get('npi')?.enable();
      this.dataForm.get('lin')?.enable();
      this.dataForm.get('dan')?.enable();
      this.dataForm.get('sex')?.enable();
      this.dataForm.get('edu')?.enable();
      this.dataForm.get('ema')?.enable();
      this.dataForm.get('tel')?.enable();
      this.dataForm.get('adr')?.enable();
      this.dataForm.get('nomp')?.enable();
      this.dataForm.get('prop')?.enable();
      this.dataForm.get('telp')?.enable();
      this.dataForm.get('telm')?.enable();
      this.dataForm.get('prom')?.enable();
      this.dataForm.get('nomm')?.enable();
      }
    }
  }
  constructor(
    private fb: FormBuilder,
    private service: EleveService,
    private serv: ClasseService,
    private cont: ContexteService,
    private drawn: NzDrawerRef,
    private msg: NzMessageService,
  ) {}
  ngOnInit(): void {
    this.eleve = this.valueIn ? this.valueIn.eleve : null;
    this.serv.getListNiveau().subscribe((res) => {
      this.niveaux = res;
    });
    this.initForm();
  }

  inform() {}

  submit() {
    /* {
      this.service.edit(eleve).subscribe(
        (res) => {
        },
        (err) => {
          /*eau de coco 1L +ail triture+ citron+sel à laisser jusqu'au lendemain.
          se rincer le corps avec après la douche matin et soir pendant 3 jours*/
    //this.close(null);
    /*},
      );
    } else */
    let insc: any = {
      id: this.valueIn ? this.valueIn.id : null,
      idEleve: this.eleve?.id,
      idEtablissement: this.cont.etsId,
      idAnneeScolaire: this.cont.anneeId,
      observation: this.dataForm.value.obs,
      dateInscription: this.dataForm.value.dai,
      classeDemandee: this.dataForm.value.niv,
      statut: this.dataForm.value.sta,
      numeroInscription: null,
    };
    if (!insc.id) {
      if (!insc.idEleve) {
        this.eleve = {
          id: this.dataForm.value.id,
          nom: this.dataForm.value.nom,
          sexe: this.dataForm.value.sex,
          npi: this.dataForm.value.npi,
          dateNaissance: this.dataForm.value.dan,
          lieuNaissance: this.dataForm.value.lin,
          educmaster: this.dataForm.value.edu,
          adresse: this.dataForm.value.adr,
          telephone: this.dataForm.value.tel,
          email: this.dataForm.value.ema,
          bp: this.dataForm.value.bp,
          nomPere: this.dataForm.value.nomp,
          professionPere: this.dataForm.value.prop,
          telPere: this.dataForm.value.telp,
          nomMere: this.dataForm.value.nomm,
          professionMere: this.dataForm.value.prom,
          telMere: this.dataForm.value.telm,
          //se: this.dataForm.value.libe,
          //idEtablissement: this.cont.ecoleId,
        };
        this.service.create(this.eleve).subscribe(
          (res) => {
            insc.idEleve = res.id;
            this.service.createSubscription(insc).subscribe(
              (dat) => {
                this.close(dat);
              },
              (err) => {
                this.service.delete(res.id).subscribe(
                  (del) => {
                    this.msg.info(del ? 'Opération avortée' : 'Embrouille ');
                    this.close(null);
                  },
                  (er) => {
                    this.msg.info('Embrouille totale');
                    this.close(null);
                  },
                );
                this.close(null);
              },
            );
          },
          (err) => {
            this.close(null);
          },
        );
      } else {
        this.service.createSubscription(insc).subscribe(
          (dat) => {
            console.log(dat);
            this.close(dat);
          },
          (err) => {
            this.close(null);
          },
        );
      }
    } else {
      this.service.editSubscription(insc).subscribe(
        (resp) => {
          this.close(resp);
        },
        (err) => {
          this.close(null);
        },
      );
    }
  }

  initForm() {
    this.dataForm = this.fb.group({
      id: [this.valueIn ? this.valueIn.id : null],
      npi: [this.valueIn ? this.valueIn.eleve.npi : null],
      nom: [this.valueIn ? this.valueIn.eleve.nom : null, Validators.required],
      dan: [
        this.valueIn ? this.valueIn.eleve.dateNaissance : new Date(),
        Validators.required,
      ],
      lin: [
        this.valueIn ? this.valueIn.eleve.lieuNaissance : null,
      ],
      sex: [this.valueIn ? this.valueIn.eleve.sexe : null, Validators.required],
      nomp: [
        this.valueIn ? this.valueIn.eleve.nomPere : null,
        Validators.required,
      ],
      prop: [
        this.valueIn ? this.valueIn.eleve.professionPere : null,
        Validators.required,
      ],
      telp: [
        this.valueIn ? this.valueIn.eleve.telephonePere : null,
        Validators.required,
      ],
      nomm: [
        this.valueIn ? this.valueIn.eleve.nomMere : null,
        Validators.required,
      ],
      prom: [
        this.valueIn ? this.valueIn.eleve.professionMere : null,
        Validators.required,
      ],
      telm: [
        this.valueIn ? this.valueIn.eleve.telephonneMere : null,
        Validators.required,
      ],
      typ: [this.ins, Validators.required],
      dai: [
        this.valueIn ? this.valueIn.dateInscription : new Date(),
        Validators.required,
      ],
      niv: [this.valueIn ? this.valueIn.classeDemandee : null],
      obs: [this.valueIn ? this.valueIn.observation : null],
      adr: [
        this.valueIn ? this.valueIn.eleve.adresse : null,
        Validators.required,
      ],
      ema: [this.valueIn ? this.valueIn.eleve.email : null],
      edu: [this.valueIn ? this.valueIn.eleve.educmaster : null],
      tel: [this.valueIn ? this.valueIn.eleve.telephone : null],
      sta: [this.valueIn ? this.valueIn.statut : null, Validators.required],
    });
    this.refresh();
  }

  close(data: Inscription | null) {
    this.drawn.close(data);
  }
}
