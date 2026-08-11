import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ecole } from '../app/pages/etablissement/etablissement.component';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  source='http://localost:8084/gs/'
  constructor(private http: HttpClient) { }
  getList(): Observable<Ecole[]>{
    return this.http.get<Ecole[]>(this.source + 'etablissement');
  }

  getOne(id: number): Observable<Ecole>{
    return this.http.get<Ecole>(this.source + 'etablissement/'+id);
  }

  create(body: any): Observable<Ecole>{
    return this.http.post<Ecole>(this.source + 'etablissement', body);
  }

  edit(body: any): Observable<Ecole>{
    return this.http.put<Ecole>(this.source + 'etablissement', body);
  }

  delete(id: number){
    this.http.delete(this.source + 'etablissement/'+id);
  }


}
