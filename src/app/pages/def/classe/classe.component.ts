import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-classe',
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NzInputModule,
      NzCardModule,
      NzInputModule,
      NzTableModule,
      NzButtonModule,
      NzToolTipModule,],
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.scss'
})
export class ClasseComponent implements OnInit {

  searchInput: string = '';

  ngOnInit(): void {
    console.log('Les classes')
  }

  create() {}
  search() {}

}
