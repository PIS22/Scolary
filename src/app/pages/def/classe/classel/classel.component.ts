import { Component, Input, OnInit } from '@angular/core';
import { Classe } from '../classe.component';
import { Inscription } from '../../../inscription/inscription.component';
import { EleveService } from '../../../../../services/eleve.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';

export interface Classement{
  inscription: Inscription;
  select: boolean;
}
@Component({
  selector: 'app-classel',
  imports: [CommonModule, FormsModule, DatePipe, NzCardModule, NzSwitchModule, NzInputModule, NzTableModule],
  templateUrl: './classel.component.html',
  styleUrl: './classel.component.scss',
})
export class ClasselComponent implements OnInit {
displayed: Classement[]=[];


  @Input() valueIn!: Classe;
  nonclasse: Inscription[] = [];
searchInput: any;

  constructor(private service: EleveService){}
  ngOnInit(): void {
    if (this.valueIn) {
      this.service.getListSubscriptionByEtabAnneeNiveau(
        this.valueIn.etablissementAnneeScolaire.etablissement.id,
        this.valueIn.etablissementAnneeScolaire.anneeScolaire.id,
        this.valueIn.niveau.code)
      .subscribe(
        (resp) => {
          this.nonclasse = resp;
          this.displayed = this.nonclasse.map(i=>{return {inscription:i, select: false}});
        }
      )
    }
  }

considerChoice(_t41: Classement) {
throw new Error('Method not implemented.');
  }

search() {
throw new Error('Method not implemented.');
}

}
