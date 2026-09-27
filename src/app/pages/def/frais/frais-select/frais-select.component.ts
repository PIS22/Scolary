import { Component, Input, OnInit } from '@angular/core';
import { Frais } from '../frais.component';
import { CommonModule } from '@angular/common';
import { Classe } from '../../classe/classe.component';
import { Inscription } from '../../../inscription/inscription.component';
import { FraisService } from '../../../../../services/frais.service';
import { CaisseService } from '../../../../../services/caisse.service';
import { FormsModule, SelectControlValueAccessor } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';

interface FraisSelect {
  frais: Frais;
  selected: boolean;
}

@Component({
  selector: 'app-frais-select',
  imports: [CommonModule, NzTableModule, NzInputModule, NzCardModule, NzCheckboxModule, FormsModule, NzSwitchModule, NzDrawerModule],
  templateUrl: './frais-select.component.html',
  styleUrl: './frais-select.component.scss',
})
export class FraisSelectComponent implements OnInit {
adjustList() {
throw new Error('Method not implemented.');
}
  valider() {
    let res = this.frais.filter(f => f.selected).map(f => { return f.frais });
    this.dref.close(res);
}
  displayed: FraisSelect[]=[];
search() {
}
  @Input() inputData: any;
  frais: FraisSelect[]=[]
searchInput: any;

  constructor(private service: CaisseService, private dref: NzDrawerRef) { }

  ngOnInit() {
    this.service.getFraisForInscription(this.inputData).subscribe(
      (res) => {
        this.frais = res.map(r => { return { frais: r, selected: false } });
        this.displayed = [...this.frais];
      }
    )

  }



}
