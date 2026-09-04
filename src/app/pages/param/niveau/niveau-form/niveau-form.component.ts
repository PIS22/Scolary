import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NiveauService } from '../../../../../services/Niveau.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { ContexteService } from '../../../../../services/contexte.service';
import { ClasseService } from '../../../../../services/classe.service';

@Component({
  selector: 'app-niveau-form',
  imports: [
    NzFormModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    NzSpaceModule,
    NzDatePickerModule,
    FormsModule,
    ReactiveFormsModule,],
  templateUrl: './niveau-form.component.html',
  styleUrl: './niveau-form.component.scss'
})
export class NiveauFormComponent  implements OnInit {
  @Input() valueIn!: any;
  dataForm!: FormGroup;
  

  constructor(
    private fb: FormBuilder,
    private service: ClasseService,
    private mod: NzDrawerRef,
    private cont: ContexteService,
  ) {}
  ngOnInit(): void {
    this.initForm();
  }

  close(valueOut: any) {
    this.mod.close(valueOut);
  }

  submit() {
    let body = {
      id: this.dataForm.value.id,
      code: this.dataForm.value.code,
      libelle: this.dataForm.value.libe,
      ordre: this.dataForm.value.ord,
    };
    
    if (body.id) {
      this.service.editNiveau(body).subscribe(
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
      this.service.createNiveau(body).subscribe(
        (res) => {
          if (res && res.id) this.close(res);
          else {
            console.log(res);
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
      code: [this.valueIn ? this.valueIn.codeNiveau : null, Validators.required],
      libe: [this.valueIn ? this.valueIn.libNiveau : null, Validators.required],
      ord: [this.valueIn ? this.valueIn.libNiveau : null, Validators.required],
    });
  }

}
