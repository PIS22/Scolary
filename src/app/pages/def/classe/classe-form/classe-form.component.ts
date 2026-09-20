import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ClasseService } from '../../../../../services/classe.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ContexteService } from '../../../../../services/contexte.service';
import { Classe } from '../classe.component';
import { Niveau } from '../../../param/niveau/niveau.component';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-classe-form',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzInputModule,
    NzCardModule,
    NzToolTipModule,
    NzFormModule,
    NzSelectModule,
  ],
  templateUrl: './classe-form.component.html',
  styleUrl: './classe-form.component.scss',
})
export class ClasseFormComponent implements OnInit {
  @Input() valueIn!: any;
  dataForm!: FormGroup;
  niveaux: Niveau[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ClasseService,
    private mod: NzDrawerRef,
    private cont: ContexteService,
  ) {}
  ngOnInit(): void {
    this.service.getListNiveau().subscribe((res) => {
      this.niveaux = res;
    });
    this.initForm();
  }

  close(valueOut: Classe | null) {
    this.mod.close(valueOut);
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
      code: [this.valueIn ? this.valueIn.codeClasse : null],
      libe: [this.valueIn ? this.valueIn.libClasse : null],
      niv: [this.valueIn ? this.valueIn.niveau.id : 0],
      cap: [this.valueIn ? this.valueIn.capacite : 0],
    });
  }
}
