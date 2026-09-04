import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Site } from '../etablissement.component';
import { EtablissementService } from '../../../../services/etablissement.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ContexteService } from '../../../../services/contexte.service';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-etabform',
  imports: [
    NzFormModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzSpaceModule,
    NzDatePickerModule,
    FormsModule,
    ReactiveFormsModule,],
  templateUrl: './etabform.component.html',
  styleUrl: './etabform.component.scss'
})
export class EtabformComponent implements OnInit {
  @Input() valueIn!: any;
  dataForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: EtablissementService,
    private mod: NzDrawerRef,
    private cont: ContexteService,
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  close(valueOut: Site | null) {
    this.mod.close(valueOut);
  }

  submit() {
    let body = {
      id: this.dataForm.value.id,
      code: this.dataForm.value.cod,
      nom: this.dataForm.value.nom,
      ville: this.dataForm.value.vil,
      adresse: this.dataForm.value.adr,
      bp: this.dataForm.value.bp,
      email: this.dataForm.value.mai,
      telephone: this.dataForm.value.tel,
      idEcole: this.valueIn.ecole.id,
    };
    console.log(body);

    if (body.id) {
      this.service.edit(body).subscribe(
        (res) => {
          if (res) this.close(res);
          else this.close(null);
        },
        (err) => {
          this.close(null);
        },
      );
    } else {
      this.service.create(body).subscribe(
        (res) => {
          if (res) {
          console.log('bon');
            this.close(res);
          }
          else {
            console.log('res');
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
      cod: [this.valueIn ? this.valueIn.code : null, Validators.required],
      nom: [this.valueIn ? this.valueIn.nom : null, Validators.required],
      adr: [this.valueIn ? this.valueIn.adresse : null, Validators.required],
      vil: [this.valueIn ? this.valueIn.ville : null, Validators.required],
      tel: [this.valueIn ? this.valueIn.telephone : null, Validators.required],
      bp: [this.valueIn ? this.valueIn.bp : null],
      mai: [this.valueIn ? this.valueIn.mail : null],
    });
  }

}
