import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ContexteService } from '../../../services/contexte.service';
import { CommonModule } from '@angular/common';
import { AnneeService } from '../../../services/annee.service';
import { Site } from '../etablissement/etablissement.component';
import { Annee } from '../def/annee/annee.component';
import { isFormControl } from '@angular/forms';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';

export interface EtabAnnee {
  id: number;
  dateOuverture: Date;
  dateFermeture: Date;
  motif: string;
  etat: 'OUVERTE' | 'CLOTUREE' | 'SUSPENDUE';
  generationAutomatiqueNumeroInscription: boolean;
  etablissement: Site;
  anneeScolaire: Annee;
}

export interface Periode {
  id: number;
  code: string;
  libelle: string;
  dateDebut: Date;
  dateFin: Date;
  ordre: number;
  etablissementAnneeScolaire: EtabAnnee;
}
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzToolTipModule,
    NzMessageModule,
  ],
})
export class WelcomeComponent implements OnInit {
  isCollapsed = false;
  defOpned = false;
  opeOpned = false;
  rapOpned = false;
  parOpned = false;
  admOpned = false;

  constructor(
    public cont: ContexteService,
    private service: AnneeService,
    private msg: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.cont.loadContext();
    this.service.getLastEtanForEtab(this.cont.etsId).subscribe(
      (res) => {
        if (res)
          this.cont.saveAnneeContext(res.anneeScolaire);
        else
          this.cont.clearAnneeContext();
      }
    )
    /*
    if (this.cont.anneeId) {
      this.service
        .getOneEtanTrget(this.cont.etsId, this.cont.anneeId)
        .subscribe(
          (res) => {
            console.log(res);

            if (!res) {
              this.msg.info(
                "L'établissement n'est pas ouvert pour cette année",
              );
              this.service.getOne(this.cont.anneeId).subscribe((resp) => {
                if (resp && resp.active) {
                  this.service
                    .createEtan({
                      idEtablissement: this.cont.etsId,
                      idAnneeScolaire: this.cont.anneeId,
                      dateOuverture: resp.dateDeb,
                      dateFermeture: null,
                      motif: null,
                      etat: 'OUVERTE',
                      generationAutomatiqueNumeroInscription: true,
                    })
                    .subscribe((re) => {
                      if (re) {
                        this.msg.info(
                          "L'cole est maintenant ouverte pour l'année " +
                            this.cont.annee,
                        );
                      }
                    });
                }
              });
            } else {
              this.service
                .getLastEtanForEtab(this.cont.etsId)
                .subscribe((res) => {
                  if (res) {
                    this.cont.saveAnneeContext(res.anneeScolaire);
                  }
                });
            }
          },
          (er) => {
            this.service
              .getLastEtanForEtab(this.cont.etsId)
              .subscribe((res) => {
                if (res) {
                  this.cont.saveAnneeContext(res.anneeScolaire);
                }
              });
          },
        );
    } else {
      console.log('Recherche de l\'année courante');

      this.service.getLastEtanForEtab(this.cont.etsId).subscribe((res) => {
        if (res) {
          this.cont.saveAnneeContext(res.anneeScolaire);
        } else {
          this.service
            .createEtan({
              idEtablissement: this.cont.etsId,
              idAnneeScolaire: this.cont.anneeId,
              dateOuverture: null,
              dateFermeture: null,
              motif: null,
              etat: 'OUVERTE',
              generationAutomatiqueNumeroInscription: true,
            })
            .subscribe((re) => {
              if (re) {
                this.msg.info(
                  "L'école est maintenant ouverte pour l'année " +
                    this.cont.annee,
                );
              }
            });
        }
      });
    }*/
  }

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
    this.parOpned = !this.parOpned;
    this.opeOpned = false;
    this.rapOpned = false;
    this.defOpned = false;
    this.admOpned = false;
  }

  admClick() {
    this.admOpned = !this.admOpned;
    this.opeOpned = false;
    this.rapOpned = false;
    this.parOpned = false;
    this.defOpned = false;
  }
}
