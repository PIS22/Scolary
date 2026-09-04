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
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { FraisService } from '../../../../../services/frais.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ContexteService } from '../../../../../services/contexte.service';
import { ClasseService } from '../../../../../services/classe.service';
import { Classe } from '../../classe/classe.component';
import { TypeFrais } from '../../../param/type-frais/type-frais.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-frais-form',
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
  templateUrl: './frais-form.component.html',
  styleUrl: './frais-form.component.scss',
})
export class FraisFormComponent implements OnInit {
  @Input() valueIn!: any;
  dataForm!: FormGroup;
  classes: Classe[] = [];
  types: TypeFrais[] = [];

  constructor(
    private fb: FormBuilder,
    private service: FraisService,
    private serv: ClasseService,
    private mod: NzDrawerRef,
    private cont: ContexteService,
  ) {}

  ngOnInit(): void {
    console.log(this.valueIn);

    this.service.getListTypeFrais().subscribe((res) => {
      if (res) {
        this.types = res;
      }
    });
    this.serv
      .getForEtab(this.cont.etsId, this.cont.anneeId)
      .subscribe((res) => {
        console.log(res);
        this.classes = res;
      });
    this.initForm();
  }

  close(valueOut: any) {
    this.mod.close(valueOut);
  }

  submit() {
    let body = {
      id: this.dataForm.value.id,
      codeFrais: this.dataForm.value.cod,
      libelle: this.dataForm.value.lib,
      idEtablissement: this.cont.etsId,
      idAnneeScolaire: this.cont.anneeId,
      idTypeFrais: this.dataForm.value.typ,
      portee: this.dataForm.value.por,
      montant:
        this.dataForm.value.por == 'SPECIFIQUE' ? 0 : this.dataForm.value.mtt,
    };
    console.log(body);

    if (body.id) {
      this.service.editFrais(body).subscribe(
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
      this.service.createFrais(body).subscribe(
        (res) => {
          console.log(res);
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
      //cla: [this.valueIn ? this.valueIn.codeFrais : null, Validators.required],
      typ: [this.valueIn && this.valueIn.typeFrais? this.valueIn.typeFrais.id : null, Validators.required],
      por: [this.valueIn ? this.valueIn.portee : null, Validators.required],
      mtt: [this.valueIn ? this.valueIn.montant : 0],
      cod: [this.valueIn ? this.valueIn.codeFrais : null, Validators.required],
      lib: [this.valueIn ? this.valueIn.libelle : null, Validators.required],
    });
  }
}
