import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from '../app/pages/def/matiere/matiere.component';


@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }
  getList(): Observable<Matiere[]>{
    return this.http.get<Matiere[]>(this.source + 'matiere');
  }

  getOne(id: number): Observable<Matiere>{
    return this.http.get<any>(this.source + 'matiere/'+id);
  }

  create(body: any): Observable<Matiere>{
    return this.http.post<Matiere>(this.source + 'matiere', body);
  }

  edit(body: any): Observable<Matiere>{
    return this.http.put<Matiere>(this.source + 'matiere/'+body.id, body);
  }

  delete(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'matiere/'+id);
  }


}
