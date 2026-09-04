import { Injectable } from '@angular/core';
import { Annee } from '../app/pages/def/annee/annee.component';
import { Ecole, Site } from '../app/pages/etablissement/etablissement.component';

@Injectable({
  providedIn: 'root',
})
export class ContexteService {
  ecole!: string | null;
  ecoleId!: number;
  annee!: string | null;
  anneeId!: number | null;

  ets!: string | null;
  etsId!: number | null;

  constructor() {}

  saveContext(annee: Annee, ecole: Ecole) {
    this.saveAnneeContext(annee);
    this.saveEcoleContext(ecole);
    this.loadContext();
  }

  saveEcoleContext(ecole: Ecole) {
    if (ecole && ecole.id) {
      localStorage.setItem('ecole', ecole.nom);
      localStorage.setItem('ecoleId', ecole.id.toString());
      this.loadEcoleContext();
    }
  }

  saveEtablContext(sit: Site) {
    if (sit && sit.id) {
      localStorage.setItem('ets', sit.nom);
      localStorage.setItem('etsId', sit.id.toString());

      this.loadEtablContext();
    }
  }

  clearEtablContext() {
      localStorage.removeItem('ets',);
      localStorage.removeItem('etsId');
  }

  saveAnneeContext(annee: Annee) {
    if (annee && annee.id) {
      localStorage.setItem('annee', annee.libelle);
      localStorage.setItem('anneeId', annee.id.toString());

      this.loadAnneeContext();
    }
  }

  clearAnneeContext() {
      localStorage.removeItem('annee');
      localStorage.removeItem('anneeId');
  }

  loadEcoleContext() {
    let eid = localStorage.getItem('ecoleId');
    this.ecole = localStorage.getItem('ecole')
      ? localStorage.getItem('ecole')
      : null;
    this.ecoleId = eid ? Number.parseInt(eid) : 0;
  }

  loadEtablContext() {
    let eid = localStorage.getItem('etsId');
    this.etsId = eid ? Number.parseInt(eid) : 0;
    this.ets = localStorage.getItem('ets')
      ? localStorage.getItem('ets')
      : null;
    //this.loadAnneeContext()
  }

  loadAnneeContext() {
    let aid = localStorage.getItem('anneeId');
    this.anneeId = aid ? Number.parseInt(aid) : 0;
    this.annee = localStorage.getItem('annee')
      ? localStorage.getItem('annee')
      : null;
    //this.loadAnneeContext()
  }

  discardAnneeContext() {
    localStorage.removeItem('annee');
    localStorage.removeItem('anneeId');
  }

  loadContext() {
    this.loadAnneeContext();
    this.loadEcoleContext();
    this.loadEtablContext();
  }
}
