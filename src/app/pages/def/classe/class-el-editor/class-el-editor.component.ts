import { Component, Input, OnInit } from '@angular/core';
import { AffectationEleve } from '../classe.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClasseService } from '../../../../../services/classe.service';
import { EleveService } from '../../../../../services/eleve.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule } from '@angular/common';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-class-el-editor',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzSelectModule,
    NzDatePickerModule,
    NzCardModule,
    NzDrawerModule,
    NzInputDirective,
    NzMessageModule
],
  templateUrl: './class-el-editor.component.html',
  styleUrl: './class-el-editor.component.scss',
})
export class ClassElEditorComponent implements OnInit {
  @Input() valueIn!: AffectationEleve;
  dataForm!: FormGroup;
constructor(private fb: FormBuilder, private service: ClasseService, private elese: EleveService, private msg: NzMessageService, private dref: NzDrawerRef){}
  ngOnInit(): void {
    this.initForm();
    console.log(this.valueIn);
  }

  submit() {
    let body = {
      id:this.valueIn? this.valueIn.id: null,
      dateAffectation: this.dataForm.value.dat ? this.dataForm.value.dat : this.valueIn.dateAffectation,
      dateFinAffectation: null,
      observation: this.dataForm.value.obs,
      idInscription: this.valueIn ? this.valueIn.inscription.id : null,
      idClasse: this.valueIn.id,
      courante: true,
    };
    this.elese.editEleveClasse(body).subscribe(
      (res) => {
        if (res) {
          this.dref.close(res)
        }
        else
          this.dref.close(null)
      },
      (err) => {

      }
    )
}
  initForm(){
    this.dataForm= this.fb.group({
      ins: [this.valueIn ? this.valueIn.inscription.eleve.nom:null],
      dat: [this.valueIn ? this.valueIn.dateAffectation:null],
      cla: [this.valueIn ? this.valueIn.inscription:null],
    })
  }

}
