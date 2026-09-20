import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ContexteService } from '../../../../../services/contexte.service';
import { ModeReglement } from '../mode-reg.component';
import { CaisseService } from '../../../../../services/caisse.service';

@Component({
  selector: 'app-mode-form',
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
  ],
  templateUrl: './mode-form.component.html',
  styleUrl: './mode-form.component.scss'
})
export class ModeFormComponent implements OnInit {
  @Input() valueIn!: any;
  dataForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: CaisseService,
    private mod: NzDrawerRef,
    private cont: ContexteService,
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  close(valueOut: ModeReglement | null) {
    this.mod.close(valueOut);
  }

  submit() {
    let body = {
      id: this.dataForm.value.id,
      libMode: this.dataForm.value.libe,
      idEtablissement: this.cont.etsId,
    };
    console.log(body);

    if (body.id) {
      this.service.editMode(body).subscribe(
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
      this.service.createMode(body).subscribe(
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
      libe: [this.valueIn ? this.valueIn.libMode : null],
    });
  }


}
