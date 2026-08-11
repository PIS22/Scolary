import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  imports: [
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzToolTipModule,
  ],
})
export class WelcomeComponent {
  isCollapsed=false
  defOpned = false;
  opeOpned = false;
  rapOpned = false;
  parOpned = false;
  admOpned = false;

  constructor() {}

  defClick() {
    this.defOpned = !this.defOpned;
    this.opeOpned = false;
    this.rapOpned = false;
    this.parOpned = false;
    this.admOpned = false;
  }
  opeClick() {
    this.opeOpned = !this.opeOpned;
    this.defOpned = false;
    this.rapOpned = false;
    this.parOpned = false;
    this.admOpned = false;
  }

  rapClick() {
    this.rapOpned = !this.rapOpned;
    this.opeOpned = false;
    this.defOpned = false;
    this.parOpned = false;
    this.admOpned = false;
  }

  parClick() {
    this.parOpned = !this.parOpned
    this.opeOpned = false;
    this.rapOpned = false;
    this.defOpned = false;
    this.admOpned = false;
  }

  admClick() {
    this.admOpned = !this.admOpned
    this.opeOpned = false;
    this.rapOpned = false;
    this.parOpned = false;
    this.defOpned = false;
  }
  
}
