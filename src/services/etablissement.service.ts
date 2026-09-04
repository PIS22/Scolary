import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ecole, Site } from '../app/pages/etablissement/etablissement.component';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }
  getListEcole(): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(this.source + 'ecole');
  }

  getOneEcole(id: number): Observable<Ecole>{
    return this.http.get<Ecole>(this.source + 'ecole/'+id);
  }

  createEcole(body: any): Observable<Ecole>{
    return this.http.post<Ecole>(this.source + 'ecole', body);
  }

  editEcole(body: any): Observable<Ecole>{
    return this.http.put<Ecole>(this.source + 'ecole/'+body.id, body);
  }

  deleteEcole(id: number){
    this.http.delete(this.source + 'ecole/'+id);
  }


  getList(): Observable<Site[]>{
    return this.http.get<Site[]>(this.source + 'etablissement');
  }

  getListByEcole(id: number): Observable<Site[]>{
    return this.http.get<Site[]>(this.source + 'etablissementByEcole/'+id);
  }

  getOne(id: number): Observable<Site>{
    return this.http.get<Site>(this.source + 'etablissement/'+id);
  }

  create(body: any): Observable<Site>{
    return this.http.post<Site>(this.source + 'etablissement', body);
  }

  edit(body: any): Observable<Site>{
    return this.http.put<Site>(this.source + 'etablissement/'+body.id, body);
  }

  delete(id: number){
    this.http.delete(this.source + 'etablissement/'+id);
  }


}
