import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { FraisService } from '../../../../../services/frais.service';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Frais, FraisClasse } from '../frais.component';
import { Classe } from '../../classe/classe.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ClasseService } from '../../../../../services/classe.service';

@Component({
  selector: 'app-frais-classe',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzCardModule,
    NzSelectModule,
    NzMessageModule,
    NzDrawerModule,
  ],
  templateUrl: './frais-classe.component.html',
  styleUrl: './frais-classe.component.scss',
})
export class FraisClasseComponent implements OnInit {
  close(arg0: any) {
    this.ref.close(arg0);
  }

  submit() {
    let body = {
      id: this.valueIn?.id,
      idFrais: this.valueIn?.frais.id,
      idClasse: this.dataForm.value.cla,
      montant: this.dataForm.value.mtt,
    };
    console.log(body

    )
    this.fraise.edit(body).subscribe(
      (res) => {
        if (res) this.close(res);
        else this.close(null);
      },
      (err) => {
        this.close(null);
      },
    );
  }

  dataForm!: FormGroup;
  frais: Frais[] = [];
  classes: Classe[] = [];
  @Input() valueIn!: FraisClasse;

  constructor(
    private fraise: FraisService,
    private claserv: ClasseService,
    private ref: NzDrawerRef,
    private msg: NzMessageService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.fraise.getFraisList().subscribe((res) => {
      this.frais = res;
    });

    this.claserv.getList().subscribe((res) => {
      this.classes = res;
    });
    this.initForm();
  }

  initForm() {
    console.log(this.valueIn);
    this.dataForm = this.fb.group({
      fra: [this.valueIn ? this.valueIn.frais.id : null, [Validators.required]],
      cla: [
        this.valueIn ? this.valueIn.classe.id : null,
        [Validators.required],
      ],
      mtt: [this.valueIn ? this.valueIn.montant : 0, [Validators.required]],
    });
  }
}
