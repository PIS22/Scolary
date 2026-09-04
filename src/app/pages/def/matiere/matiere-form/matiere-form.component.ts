import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatiereService } from '../../../../../services/Matiere.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ContexteService } from '../../../../../services/contexte.service';
import { Matiere } from '../matiere.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'app-matiere-form',
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
  templateUrl: './matiere-form.component.html',
  styleUrl: './matiere-form.component.scss'
})
export class MatiereFormComponent implements OnInit {
  @Input() valueIn!: any;
  dataForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: MatiereService,
    private mod: NzDrawerRef,
    private cont: ContexteService,
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  close(valueOut: Matiere | null) {
    this.mod.close(valueOut);
  }

  submit() {
    let body = {
      id: this.dataForm.value.id,
      codeMatiere: this.dataForm.value.code,
      libMatiere: this.dataForm.value.libe,
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
      code: [this.valueIn ? this.valueIn.codeMatiere : null, Validators.required],
      libe: [this.valueIn ? this.valueIn.libMatiere : null, Validators.required],
    });
  }
  
}
