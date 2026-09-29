import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { AffectationEleve } from '../../classe/classe.component';
import { ContexteService } from '../../../../../services/contexte.service';
import { ClasseService } from '../../../../../services/classe.service';
import { Eleve } from '../eleve.component';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-eleve-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzDatePickerModule,
    NzSelectModule,
    NzCardModule,
    NzDividerModule,
    NzSwitchModule,
    NzDrawerModule,
  ],
  templateUrl: './eleve-form.component.html',
  styleUrl: './eleve-form.component.scss',
})
export class EleveFormComponent implements OnInit {
  dataForm!: FormGroup;
  submit() {
    throw new Error('Method not implemented.');
  }
  @Input() valueIn!: Eleve;

  constructor(
    private cont: ContexteService,
    private service: ClasseService,
    private fb: FormBuilder,
    private drawn: NzDrawerRef,
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  initForm() {
    this.dataForm = this.fb.group({
      id: [this.valueIn ? this.valueIn.id : null],
      npi: [this.valueIn ? this.valueIn.npi : null],
      nom: [this.valueIn ? this.valueIn.nom : null, Validators.required],
      dan: [
        this.valueIn ? this.valueIn.dateNaissance : new Date(),
        Validators.required,
      ],
      lin: [this.valueIn ? this.valueIn.lieuNaissance : null],
      sex: [this.valueIn ? this.valueIn.sexe : null, Validators.required],
      nomp: [this.valueIn ? this.valueIn.nomPere : null, Validators.required],
      prop: [
        this.valueIn ? this.valueIn.professionPere : null,
        Validators.required,
      ],
      telp: [this.valueIn ? this.valueIn.telPere : null, Validators.required],
      nomm: [this.valueIn ? this.valueIn.nomMere : null, Validators.required],
      prom: [
        this.valueIn ? this.valueIn.professionMere : null,
        Validators.required,
      ],
      telm: [this.valueIn ? this.valueIn.telMere : null, Validators.required],
      adr: [this.valueIn ? this.valueIn.adresse : null, Validators.required],
      ema: [this.valueIn ? this.valueIn.email : null],
      edu: [this.valueIn ? this.valueIn.educmaster : null],
      tel: [this.valueIn ? this.valueIn.telephone : null],
    });
  }

  close(data: Eleve | null) {
    this.drawn.close(data);
  }
}
