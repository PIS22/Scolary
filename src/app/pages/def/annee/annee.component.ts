import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

export interface Annee{
  id: number;
  code: string;
  libelle: string;
  dateDeb: Date;
  dateFin: Date;
  active: boolean;
}

@Component({
  selector: 'app-annee',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzCardModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
  ],
  templateUrl: './annee.component.html',
  styleUrl: './annee.component.scss',
})
export class AnneeComponent implements OnInit{

  datas: Annee[] = []
  displayed: Annee[] = [];
  searchInput: string = '';

  constructor(){}
  ngOnInit(): void {
  }

  create() {}
  search() {}

}
