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
import { log } from 'ng-zorro-antd/core/logger';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ContexteService } from '../../../services/contexte.service';
import { NzDragService } from 'ng-zorro-antd/core/services';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { EtabformComponent } from './etabform/etabform.component';
import { AnneeService } from '../../../services/annee.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

export interface Ecole {
  id: number | null;
  code: string;
  nom: string;
  sigle: string;
  telephone: string;
  email: string;
  siteweb: string;
  adresse: string;
  ville: string;
  pays: string;
  devise: string;
}

export interface Site {
  id: number;
  code: string;
  nom: string;
  ville: string;
  adresse: string;
  bp: string;
  telephone: string;
  email: string;
  ecole: Ecole;
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
    NzToolTipModule,
    NzDividerModule,
    NzIconModule,
    NzGridModule,
    NzDrawerModule,
  ],
  templateUrl: './etablissement.component.html',
  styleUrl: './etablissement.component.scss',
})
export class EtablissementComponent implements OnInit {
  searchedData: string = '';

  sites: Site[] = [];
  displayed: Site[] = [];
  label: string = 'Valider';

  form!: FormGroup;
  id = null;
  data: any = {
    id: null,
    nom: '',
    adresse: '',
    ville: '',
    bp: '',
    telephone: '',
    email: '',
  };
  searchInput: string = '';

  constructor(
    private service: EtablissementService,
    private msg: NzMessageService,
    private cont: ContexteService,
    private drawer: NzDrawerService,
    private anser: AnneeService,
    private route: Router,
  ) {}

  submit() {
    localStorage.clear();
    if (this.data.nom != '') {
      if (!this.data.id) {
        this.service.createEcole(this.data).subscribe(
          (res) => {
            if (!res.id) this.msg.info("La création de l'école a échoué");
            else {
              this.cont.saveEcoleContext(res);
            }
          },
          (err) => {
            this.msg.error("La création de l'école a échoué: " + err);
          },
        );
      } else {
        this.service.editEcole(this.data).subscribe(
          (res) => {
            if (!res.id) this.msg.info("La création de l'école a échoué");
          },
          (err) => {
            this.msg.error("La création de l'école a échoué: " + err);
          },
        );
      }
    } else {
      console.log('Le nom ne peut êre vide');
    }
  }

  ngOnInit(): void {
    localStorage.removeItem('ets');
    localStorage.removeItem('etsId');
    this.service.getListEcole().subscribe((ecoles) => {
      if (ecoles.length > 0) {
        this.data = ecoles[0];
        this.label = "Modifier l'école";
        this.service.getListByEcole(this.data.id).subscribe((list) => {
          this.sites = list;
          this.displayed = [...this.sites];
        });
      } else this.label = 'Créer une école';
    });
  }

  search() {
    if (this.searchedData.trim()) {
      this.displayed = this.sites.filter((e) => {
        return (
          e.code.includes(this.searchedData.trim()) ||
          e.nom.includes(this.searchedData.trim()) ||
          e.adresse.includes(this.searchedData.trim()) ||
          e.ville.includes(this.searchedData.trim()) ||
          e.telephone.includes(this.searchedData.trim())
        );
      });
    } else {
      this.displayed = this.sites;
    }
  }

  addingPop() {
    this.drawer
      .create<EtabformComponent, { valueIn: any }>({
        nzClosable: true,
        nzWidth: 600,
        nzContent: EtabformComponent,
        nzData: {
          valueIn: {
            adresse: '',
            bp: '',
            code: '',
            ecole: { id: this.data.id },
            email: '',
            id: null,
            nom: '',
            telephone: '',
            ville: '',
          },
        },
      })
      .afterClose.subscribe((out) => {
        if (out) {
          if (out.id) {
            console.log(out);
            this.sites.push(out);
            this.displayed = [...this.sites];
          }
        }
      });
  }

  editingPop(_t207: Site, ind: number) {
    this.drawer
      .create<EtabformComponent, { valueIn: Site }>({
        nzClosable: true,
        nzWidth: 600,
        nzContent: EtabformComponent,
        nzData: {
          valueIn: _t207,
        },
      })
      .afterClose.subscribe((out) => {
        if (out) {
          if (out.id) {
            this.sites[ind] = out;
            this.displayed = [...this.sites];
          }
        }
      });
  }
  enter(_t213: Site) {
    this.cont.saveEtablContext(_t213);
    this.route.navigate(['manager']);
  }
}
