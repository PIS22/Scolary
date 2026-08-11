import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

export interface Caisse {
  codeCaisse: string;
  libCaisse: string;
  idEtablissement: number;
}
@Component({
  selector: 'app-caisse',
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzInputModule,
    NzTableModule,
    NzButtonModule,
    NzToolTipModule,
  ],
  templateUrl: './caisse.component.html',
  styleUrl: './caisse.component.scss',
})
export class CaisseComponent implements OnInit {
  datas: Caisse[] = [];
  displayed: Caisse[] = [];
  searchInput: string = '';

  ngOnInit(): void {}

  create() {}
  search() {}
}
