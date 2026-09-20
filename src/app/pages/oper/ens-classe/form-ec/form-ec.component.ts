import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { EnseignantService } from '../../../../../services/enseignant.service';
import { NzMessageService, NzMessageModule } from 'ng-zorro-antd/message';
import {
  Enseignant,
  EnseignerClasse,
} from '../../../def/enseignant/enseignant.component';
import { ClasseService } from '../../../../../services/classe.service';
import { Classe } from '../../../def/classe/classe.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { MatiereService } from '../../../../../services/Matiere.service';
import { Matiere } from '../../../def/matiere/matiere.component';
import { NzCheckListModule } from 'ng-zorro-antd/check-list';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';

interface MatiereChoisie {
  matiere: Matiere;
  chosen: boolean;
}
@Component({
  selector: 'app-form-ec',
  imports: [
    CommonModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzMessageModule,
    NzDrawerModule,
    NzFormModule,
    NzSwitchModule,
    NzToolTipModule,
    NzDatePickerModule,
    NzCheckListModule,
    NzGridModule,
    NzCheckboxModule,
    NzDividerModule,
  ],
  templateUrl: './form-ec.component.html',
  styleUrl: './form-ec.component.scss',
})
export class FormECComponent implements OnInit {
  selectAll(val: any) {
    //this.matieres=this.matieres.map(m=>{return {matiere: m.matiere, }})
  console.log(val);
  
}
  consider(_t78: MatiereChoisie) {
    console.log(this.matieres);
    _t78.chosen = !_t78.chosen;
  }
  @Input() valueIn: any;
  classes: Classe[] = [];
  ens: Enseignant[] = [];
  matieres: MatiereChoisie[] = [];
  dataForm!: FormGroup;
  assignations: EnseignerClasse[] = [];

  constructor(
    private service: EnseignantService,
    private claser: ClasseService,
    private matiser: MatiereService,
    private fbuilder: FormBuilder,
    private ref: NzDrawerRef,
    private msg: NzMessageService,
  ) {}

  close(data: EnseignerClasse | null) {
    this.ref.close(data);
  }

  ngOnInit(): void {
    this.service.getList().subscribe((data) => {
      this.ens = data;
      if (this.ens.length > 0) {
        this.claser.getList().subscribe((dat) => {
          this.classes = dat;
          if (this.classes.length > 0) {
            this.matiser.getList().subscribe((resp) => {
              this.matieres = resp.map((r) => {
                return { matiere: r, chosen: false };
              });
              console.log(this.matieres);
              if (this.matieres.length == 0)
                this.msg.info("Il n'y a pass de matière à dispenser");
            });
          } else this.msg.info("Il n'y a pass de classe à assigner");
        });
      }
    });
    this.initForm();
  }

  initForm() {
    this.dataForm = this.fbuilder.group({
      ens: [this.valueIn ? this.valueIn.enseignant.id : null],
      cla: [this.valueIn ? this.valueIn.classe?.id : null],
      dat: [this.valueIn ? this.valueIn.dateAffectation : new Date()],
      tit: [this.valueIn ? this.valueIn.maitreTitulaire : true],
      all: [false],
    });
  }
  submit() {
    let body = this.matieres
      .filter((m) => m.chosen)
      .map((c) => {
        return {
          dateAffectation: this.dataForm.value.dat,
          idEnseignant: this.dataForm.value.ens,
          idClasse: this.dataForm.value.cla.id,
          maitreTitulaire: this.dataForm.value.tit,
          idMatiere: c.matiere.id,
        };
      });
    console.log(body);    
    this.service.assignClasses(body).subscribe(
      (resp) => {
        if (resp.length == 0)
          this.msg.info('Assignation non effectuée');
        this.ref.close(resp);
      },
      (err) => {
        this.msg.error('Assignation échouée: \n' + err);
        this.ref.close(null);
      }

    )
  }
}
