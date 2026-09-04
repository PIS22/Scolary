import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enseignant, EnseignerClasse } from '../app/pages/def/enseignant/enseignant.component';


@Injectable({
  providedIn: 'root'
})
export class EnseignantService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }
  getList(): Observable<Enseignant[]>{
    return this.http.get<Enseignant[]>(this.source + 'enseignant');
  }

  getOne(id: number): Observable<Enseignant>{
    return this.http.get<any>(this.source + 'enseignant/'+id);
  }

  create(body: any): Observable<Enseignant>{
    return this.http.post<Enseignant>(this.source + 'enseignant', body);
  }

  edit(body: any): Observable<Enseignant>{
    return this.http.put<Enseignant>(this.source + 'enseignant/'+body.id, body);
  }

  delete(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'enseignant/'+id);
  }


  getListEnseignerClasse(): Observable<EnseignerClasse[]>{
    return this.http.get<EnseignerClasse[]>(this.source + 'enseignement');
  }

  getOneEnClasse(id: number): Observable<EnseignerClasse>{
    return this.http.get<any>(this.source + 'enseignement/'+id);
  }

  createEnClasse(body: any): Observable<EnseignerClasse>{
    return this.http.post<EnseignerClasse>(this.source + 'enseignement', body);
  }

  editEnClasse(body: any): Observable<EnseignerClasse>{
    return this.http.put<EnseignerClasse>(this.source + 'enseignement/'+body.id, body);
  }

  deleteEnClasse(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'enseignement/'+id);
  }

}
