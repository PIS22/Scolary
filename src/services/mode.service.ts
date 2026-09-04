import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeReglement } from '../app/pages/man/mode-reg/mode-reg.component';


@Injectable({
  providedIn: 'root'
})
export class ModeReglementService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }
  getList(): Observable<ModeReglement[]>{
    return this.http.get<ModeReglement[]>(this.source + 'modereglement');
  }

  getOne(id: number): Observable<ModeReglement>{
    return this.http.get<any>(this.source + 'modereglement/'+id);
  }

  create(body: any): Observable<ModeReglement>{
    return this.http.post<ModeReglement>(this.source + 'modereglement', body);
  }

  edit(body: any): Observable<ModeReglement>{
    return this.http.put<ModeReglement>(this.source + 'modereglement/'+body.id, body);
  }

  delete(id: number){
    this.http.delete(this.source + 'modereglement/'+id);
  }


}
