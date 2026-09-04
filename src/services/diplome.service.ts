import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diplome } from '../app/pages/def/diplome/diplome.component';


@Injectable({
  providedIn: 'root'
})
export class DiplomeService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }
  getList(): Observable<Diplome[]>{
    return this.http.get<Diplome[]>(this.source + 'diplome');
  }

  getOne(id: number): Observable<Diplome>{
    return this.http.get<any>(this.source + 'diplome/'+id);
  }

  create(body: any): Observable<Diplome>{
    return this.http.post<Diplome>(this.source + 'diplome', body);
  }

  edit(body: any): Observable<Diplome>{
    return this.http.put<Diplome>(this.source + 'diplome/'+body.id, body);
  }

  delete(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'diplome/'+id);
  }


}
