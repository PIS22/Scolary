import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Niveau } from '../app/pages/param/niveau/niveau.component';


@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }
  getListNiveau(): Observable<Niveau[]>{
    return this.http.get<Niveau[]>(this.source + 'niveau');
  }

  getOneNiveau(id: number): Observable<Niveau>{
    return this.http.get<any>(this.source + 'niveau/'+id);
  }

  createNiveau(body: any): Observable<Niveau>{
    return this.http.post<Niveau>(this.source + 'niveau', body);
  }

  editNiveau(body: any): Observable<Niveau>{
    return this.http.put<Niveau>(this.source + 'niveau/'+body.id, body);
  }

  deleteNiveau(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'niveau/'+id);
  }


}
