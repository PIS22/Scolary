import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ContexteService } from '../../../../../services/contexte.service';
import { EnseignantService } from '../../../../../services/enseignant.service';
import { Enseignant } from '../enseignant.component';
import { CommonModule } from '@angular/common';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-enseignant-form',
  imports: [
    CommonModule,
    NzFormModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzSpaceModule,
    NzDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzGridModule
  ],
  templateUrl: './enseignant-form.component.html',
  styleUrl: './enseignant-form.component.scss',
})
export class EnseignantFormComponent implements OnInit {
  @Input() valueIn!: any;
  dataForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: EnseignantService,
    private mod: NzDrawerRef,
    private cont: ContexteService,
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  close(valueOut: Enseignant | null) {
    let body = {
      id: this.dataForm.value.id,
      nom: this.dataForm.value.nom,
      sitMat: this.dataForm.value.sim,
      dateNaissance: this.dataForm.value.dan,
      datePriseService: this.dataForm.value.das,
      lieuNaissance: this.dataForm.value.lin,
      sexe: this.dataForm.value.sex,
      adresse: this.dataForm.value.adr,
      telephone: this.dataForm.value.tel,
      email: this.dataForm.value.ema,
      specialite: this.dataForm.value.spe,
      grade: this.dataForm.value.gra,
      observation: this.dataForm.value.obs,
      numNpi: this.dataForm.value.npi,
      matricule: this.dataForm.value.mat,
      idEtablissement: this.cont.ecoleId,
      //educmaster: this.dataForm.value.edu,
    };
    console.log(body)
    this.mod.close(valueOut);
  }

  submit() {
    let body = {
      id: this.valueIn?this.valueIn.id: null,
      nom: this.dataForm.value.nom,
      sitMat: this.dataForm.value.sim,
      dateNaissance: this.dataForm.value.dan,
      datePriseService: this.dataForm.value.das,
      lieuNaissance: this.dataForm.value.lin,
      sexe: this.dataForm.value.sex,
      adresse: this.dataForm.value.adr,
      telephone: this.dataForm.value.tel,
      email: this.dataForm.value.ema,
      specialite: this.dataForm.value.spe,
      grade: this.dataForm.value.gra,
      observation: this.dataForm.value.obs,
      numNpi: this.dataForm.value.npi,
      matricule: this.dataForm.value.mat,
      idEtablissement: this.cont.ecoleId,
      //educmaster: this.dataForm.value.edu,
    };
    if (body.id) {
      this.service.edit(body).subscribe(
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
      this.service.create(body).subscribe(
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

  initForm() {
    this.dataForm = this.fb.group({
      id: [this.valueIn ? this.valueIn.id : null],
      mat: [this.valueIn ? this.valueIn.matricule : null, Validators.required],
      npi: [this.valueIn ? this.valueIn.numNpi : null, Validators.required],
      nom: [this.valueIn ? this.valueIn.nom : null, Validators.required],
      dan: [this.valueIn ? this.valueIn.dateNaissance : new Date(),Validators.required,],
      lin: [this.valueIn ? this.valueIn.lieuNaissance : null, Validators.required,],
      sex: [this.valueIn ? this.valueIn.sexe : null, Validators.required],
      sim: [this.valueIn ? this.valueIn.sitMat : null, Validators.required],
      adr: [this.valueIn ? this.valueIn.adresse : null, Validators.required],
      ema: [this.valueIn ? this.valueIn.email : null],
      tel: [this.valueIn ? this.valueIn.telephone : null, Validators.required],
      spe: [this.valueIn ? this.valueIn.specialite : null],
      gra: [this.valueIn ? this.valueIn.grade : null],
      //edu: [this.valueIn ? this.valueIn.educmaster : null, Validators.required],
      das: [this.valueIn ? this.valueIn.datePriseService : new Date(), Validators.required,],
      obs: [this.valueIn ? this.valueIn.observation : null],
    });
  }
}
