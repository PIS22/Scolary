import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annee } from '../app/pages/def/annee/annee.component';
import { EtabAnnee, Periode } from '../app/pages/welcome/welcome.component';


@Injectable({
  providedIn: 'root'
})
export class AnneeService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }

  getList(): Observable<Annee[]>{
    return this.http.get<Annee[]>(this.source + 'anneeScolaire');
  }

  getCurrent(id: any): Observable<Annee>{
    return this.http.get<any>(this.source + 'anneeScolaire/'+id);
  }

  getOne(id: any): Observable<Annee>{
    return this.http.get<any>(this.source + 'anneeScolaire/'+id);
  }

  create(body: any): Observable<Annee>{
    return this.http.post<Annee>(this.source + 'anneeScolaire', body);
  }

  edit(body: any): Observable<Annee>{
    return this.http.put<Annee>(this.source + 'anneeScolaire/'+body.id, body);
  }

  delete(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'anneeScolaire/'+id);
  }


  getListEta(): Observable<EtabAnnee[]>{
    return this.http.get<EtabAnnee[]>(this.source + 'etablissement');
  }

  getOneEta(id: any): Observable<EtabAnnee>{
    return this.http.get<any>(this.source + 'etablissement/'+id);
  }

  getOneEtaTrget(id1: any, id2: any): Observable<EtabAnnee>{
    return this.http.get<any>(this.source + 'etablissement/'+id1);
  }

  createEta(body: any): Observable<EtabAnnee>{
    return this.http.post<EtabAnnee>(this.source + 'etablissement', body);
  }

  editEta(body: any): Observable<EtabAnnee>{
    return this.http.put<EtabAnnee>(this.source + 'etablissement/'+body.id, body);
  }

  deleteEta(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'etablissement/'+id);
  }

  getListEtan(): Observable<EtabAnnee[]>{
    return this.http.get<EtabAnnee[]>(this.source + 'etablissement');
  }

  getOneEtan(id: any): Observable<EtabAnnee[]>{
    return this.http.get<any>(this.source + 'etablissementAnnee/'+id);
  }

  getEtanForEtab(id: any): Observable<EtabAnnee[]>{
    return this.http.get<EtabAnnee[]>(this.source + 'etablissementAnneeByIdEts/'+id);
  }

  getLastEtanForEtab(id: any): Observable<EtabAnnee>{
    return this.http.get<EtabAnnee>(this.source + 'derniereAnneeScolaireByIdEts/'+id);
  }

  getOneEtanTrget(id1: any, id2: any): Observable<EtabAnnee>{
    return this.http.get<any>(this.source + 'etablissementAnneeByIdEtsByIdAnnee/'+id1+'/'+id2);
  }

  createEtan(body: any): Observable<EtabAnnee>{
    return this.http.post<EtabAnnee>(this.source + 'etablissementAnnee', body);
  }

  editEtan(body: any): Observable<EtabAnnee>{
    return this.http.put<EtabAnnee>(this.source + 'etablissementAnnee/'+body.id, body);
  }

  deleteEtan(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'etablissementAnnee/'+id);
  }

  getListPeriode(): Observable<Periode[]>{
    return this.http.get<Periode[]>(this.source + 'periode');
  }

  getOnePeriode(id: any): Observable<Periode>{
    return this.http.get<any>(this.source + 'periode/'+id);
  }

  getOnePerione(id1: any, id2: any): Observable<Periode>{
    return this.http.get<any>(this.source + 'periode/'+id1+'/annee/'+id2);
  }

  createPeriode(body: any): Observable<Periode>{
    return this.http.post<Periode>(this.source + 'periode', body);
  }

  editPeriode(body: any): Observable<Periode>{
    return this.http.put<Periode>(this.source + 'periode/'+body.id, body);
  }

  deletePeriode(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'periode/'+id);
  }


}
