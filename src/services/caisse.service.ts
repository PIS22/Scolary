import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Caisse } from '../app/pages/def/caisse/caisse.component';
import { Paiement } from '../app/pages/oper/paiement/paiement.component';


@Injectable({
  providedIn: 'root'
})
export class CaisseService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }
  getList(): Observable<Caisse[]>{
    return this.http.get<Caisse[]>(this.source + 'caisse');
  }

  getOne(id: number): Observable<Caisse>{
    return this.http.get<any>(this.source + 'caisse/'+id);
  }

  create(body: any): Observable<Caisse>{
    return this.http.post<Caisse>(this.source + 'caisse', body);
  }

  edit(body: any): Observable<Caisse>{
    return this.http.put<Caisse>(this.source + 'caisse/'+body.id, body);
  }

  delete(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'caisse/'+id);
  }

  getListPaiement(): Observable<Paiement[]>{
    return this.http.get<Paiement[]>(this.source + 'paiement');
  }

  getOnePaiement(id: number): Observable<Paiement>{
    return this.http.get<any>(this.source + 'paiement/'+id);
  }

  createPaiement(body: any): Observable<Paiement>{
    return this.http.post<Paiement>(this.source + 'paiement', body);
  }

  editPaiement(body: any): Observable<Paiement>{
    return this.http.put<Paiement>(this.source + 'paiement/'+body.id, body);
  }

  deletePaiement(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'paiement/'+id);
  }


}
