import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eleve } from '../app/pages/def/eleve/eleve.component';
import { Inscription } from '../app/pages/inscription/inscription.component';
import { AffectationEleve } from '../app/pages/oper/eleve-classe/eleve-classe.component';


@Injectable({
  providedIn: 'root'
})
export class EleveService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }
  getList(): Observable<Eleve[]>{
    return this.http.get<Eleve[]>(this.source + 'eleve');
  }

  getOne(id: number): Observable<Eleve>{
    return this.http.get<any>(this.source + 'eleve/'+id);
  }

  create(body: any): Observable<Eleve>{
    return this.http.post<Eleve>(this.source + 'eleve', body);
  }

  edit(body: any): Observable<Eleve>{
    return this.http.put<Eleve>(this.source + 'eleve/'+body.id, body);
  }

  delete(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'eleve/'+id);
  }


  getListEleveClasse(): Observable<AffectationEleve[]>{
    return this.http.get<AffectationEleve[]>(this.source + 'eleve');
  }

  getListEleveForClasse(idClasse: number): Observable<AffectationEleve[]>{
    return this.http.get<AffectationEleve[]>(this.source + 'affectationEleveByIdClasse/'+idClasse);
  }

  getOneEleveClasse(id: number): Observable<AffectationEleve>{
    return this.http.get<any>(this.source + 'eleve/'+id);
  }

  createEleveClasse(body: any): Observable<AffectationEleve>{
    return this.http.post<AffectationEleve>(this.source + 'eleve', body);
  }

  createEleveClasseList(body: any): Observable<AffectationEleve[]>{
    return this.http.post<AffectationEleve[]>(this.source + 'affectation/eleve', body);
  }

  editEleveClasse(body: any): Observable<AffectationEleve>{
    return this.http.put<AffectationEleve>(this.source + 'eleve/'+body.id, body);
  }

  deleteEleveClasse(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'eleve/'+id);
  }

  getListSubscription(): Observable<Inscription[]>{
    return this.http.get<Inscription[]>(this.source + 'inscription');
  }

  getOneSubscription(id: number): Observable<Inscription>{
    return this.http.get<any>(this.source + 'inscription/'+id);
  }

  getOnetargetedSubscription(num: string): Observable<Inscription>{
    let httpparams= new HttpParams().append('numero',num)
    return this.http.get<any>(this.source + 'inscriptionByNumero/', {params:httpparams});
  }

  getListSubscriptionByAnnee(): Observable<Inscription[]>{
    return this.http.get<Inscription[]>(this.source + 'inscription');
  }

  getListSubscriptionByEtabAnnee(idEtab: number, idAnnee: number) :Observable<Inscription[]>{
    return this.http.get<Inscription[]>(this.source + 'inscriptionByEtsAnnee/' + idEtab + '/' + idAnnee);
  }

  getListSubscriptionByEtabAnneeNiveau(idEtab: number, idAnnee: number, classe: string): Observable<Inscription[]>{
    let httpParams = new HttpParams().set('idEts', idEtab).set('idAnnee', idAnnee).set('classeDemandee', classe);
    return this.http.get<Inscription[]>(this.source + 'inscriptionByEtsAnneeClasseDemandee', {params:httpParams});
  }

  createSubscription(body: any): Observable<Inscription>{
    return this.http.post<Inscription>(this.source + 'inscription', body);
  }

  editSubscription(body: any): Observable<Inscription>{
    return this.http.put<Inscription>(this.source + 'inscription/'+body.id, body);
  }

  deleteSubscription(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'inscription/'+id);
  }


}
