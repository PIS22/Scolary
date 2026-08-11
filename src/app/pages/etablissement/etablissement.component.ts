import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { EtablissementService } from '../../../services/etablissement.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';

export interface Ecole{
  id: number;
  nom: string;
  adresse: string;
  ville: string;
  BP: string;
  telephone: string;
  email: string;
}
@Component({
  selector: 'app-etablissement',
  imports: [
    CommonModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCardModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule, NzDividerModule, NzGridModule
  ],
  templateUrl: './etablissement.component.html',
  styleUrl: './etablissement.component.scss'
})
export class EtablissementComponent  implements OnInit{
  saveData() {
    console.log('Validation');
}

  form!: FormGroup;
  data: any={nom:'', adresse: '', ville:'', bp: '', telephone: '',email:'', id:0};
  searchInput: string = '';

  constructor(private service: EtablissementService){}

  ngOnInit(): void {
  }
  create() {}
  search() {}

}
