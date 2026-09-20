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

interface FraisSelect {
  frais: Frais;
  Classe: Classe;
  selected: boolean;
}

@Component({
  selector: 'app-frais-select',
  imports: [CommonModule, NzTableModule, NzInputModule, NzCardModule, NzCheckboxModule, FormsModule, NzSwitchModule],
  templateUrl: './frais-select.component.html',
  styleUrl: './frais-select.component.scss',
})
export class FraisSelectComponent implements OnInit {
valider() {
throw new Error('Method not implemented.');
}
  displayed!: any[];
search() {
throw new Error('Method not implemented.');
}
  @Input() inputData: any;
  frais: any;
searchInput: any;

  constructor(private service: CaisseService) { }

  ngOnInit() {
        console.log(this.inputData);
    this.service.getFraisForInscription(this.inputData).subscribe(
      (res) => {
        this.frais = res.map(r => { return { frais: r } })
        console.log(this.frais);
        this.displayed = [...this.frais];
        console.log(this.displayed);
      }
    )

  }
  public OnoK(){}
}
