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
import { DiplomeService } from '../../../../../services/diplome.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ContexteService } from '../../../../../services/contexte.service';
import { Diplome } from '../diplome.component';

@Component({
  selector: 'app-diplome-form',
  imports: [
    NzFormModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzSpaceModule,
    NzDatePickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './diplome-form.component.html',
  styleUrl: './diplome-form.component.scss',
})
export class DiplomeFormComponent implements OnInit {
  @Input() valueIn!: any;
  dataForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: DiplomeService,
    private mod: NzDrawerRef,
    private cont: ContexteService,
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  close(valueOut: Diplome | null) {
    this.mod.close(valueOut);
  }

  submit() {
    let body = {
      id: this.dataForm.value.id,
      code: this.dataForm.value.code,
      libelle: this.dataForm.value.libe,
      dateDeb: this.dataForm.value.per[0],
      dateFin: this.dataForm.value.per[1],
      idEtablissement: this.cont.ecoleId,
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
      code: [this.valueIn ? this.valueIn.code : null, Validators.required],
      libe: [this.valueIn ? this.valueIn.libelle : null, Validators.required],
    });
  }
  
}
