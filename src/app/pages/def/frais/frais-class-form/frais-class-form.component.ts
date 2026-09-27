import { Component, Input, OnInit } from '@angular/core';
import { Frais, FraisClasse } from '../frais.component';
import { ContexteService } from '../../../../../services/contexte.service';
import { FraisService } from '../../../../../services/frais.service';
import { ClasseService } from '../../../../../services/classe.service';
import { Classe } from '../../classe/classe.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule, NzDrawerRef } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-frais-class-form',
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzTableModule,
    NzCardModule,
    NzDrawerModule
  ],
  templateUrl: './frais-class-form.component.html',
  styleUrl: './frais-class-form.component.scss',
})
export class FraisClassFormComponent implements OnInit {
  @Input() valueIn!: Frais;
  classes: Classe[] = [];
  datas: FraisClasse[] = [];
  displayed: FraisClasse[] = [];
  searchInput: any;
  constructor(
    private cont: ContexteService,
    private service: FraisService,
    private clas: ClasseService, private dref: NzDrawerRef
  ) {}

  ngOnInit(): void {
    this.clas
      .getForEtab(this.cont.etsId, this.cont.anneeId)
      .subscribe((data) => {
        if (data.length > 0) {
          this.classes = data;
          this.service.getListByFrais(this.valueIn.id).subscribe((resp) => {
            if (resp.length > 0) {
              resp.forEach((e) => {
                this.classes.splice(
                  this.classes.findIndex((i) => e),
                  1,
                );
              });
            }
          });
          this.datas = this.classes.map((c) => {
            return { id: 0, frais: this.valueIn, classe: c, montant: 0 };
          });
          this.displayed = this.datas;
        }
      });
  }

  mergeData(_t44: FraisClasse) {
    this.datas[
      this.datas.findIndex(
        (d) => d.frais.id === _t44.frais.id && d.classe.id === _t44.classe.id,
      )
    ].montant = _t44.montant;
    if (this.searchInput) {
      this.searchInput = null;
    }
    this.displayed = [...this.datas];
  }

  saveDatas() {
    let list = this.datas
      .filter((d) => {
        return d.montant > 0;
      })
      .map((d) => {
        return {
          idClasse: d.classe.id,
          idFrais: d.frais.id,
          montant: d.montant,
        };
      });
    this.service.createListe(list).subscribe((resp) => {
      if (resp)
        this.dref.close(resp);
    },
      (err) => {
        this.dref.close(null);
    });
  }
  search() {
    if (this.searchInput != null){
      this.displayed = this.datas.filter((d) => {
        return d.classe.codeClasse
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    }
    else this.displayed = this.datas;
  }

  montantRenseigne(): boolean {
    return this.displayed.every((d) => {
      return d.montant <= 0;
    });
  }

}
