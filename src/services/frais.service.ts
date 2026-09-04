import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeFrais } from '../app/pages/param/type-frais/type-frais.component';
import { Frais, FraisClasse, Tranche } from '../app/pages/def/frais/frais.component';


@Injectable({
  providedIn: 'root'
})
export class FraisService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }
  getListTypeFrais(): Observable<TypeFrais[]>{
    return this.http.get<TypeFrais[]>(this.source + 'typeFrais');
  }

  getOneTypeFrais(id: number): Observable<TypeFrais>{
    return this.http.get<any>(this.source + 'typeFrais/'+id);
  }

  createTypeFrais(body: any): Observable<TypeFrais>{
    return this.http.post<TypeFrais>(this.source + 'typeFrais', body);
  }

  editTypeFrais(body: any): Observable<TypeFrais>{
    return this.http.put<TypeFrais>(this.source + 'typeFrais/'+body.id, body);
  }

  deleteTypeFrais(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'typeFrais/'+ id);
  }

  getFraisList(): Observable<Frais[]>{
    return this.http.get<Frais[]>(this.source + 'frais');
  }

  getFraisOne(id: number): Observable<Frais>{
    return this.http.get<any>(this.source + 'frais/' +id);
  }

  createFrais(body: any): Observable<Frais>{
    return this.http.post<Frais>(this.source + 'frais', body);
  }

  editFrais(body: any): Observable<Frais>{
    return this.http.put<Frais>(this.source + 'frais/'+ body.id, body);
  }

  deleteFrais(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'fais/' +id);
  }

  getList(): Observable<FraisClasse[]>{
    return this.http.get<FraisClasse[]>(this.source + 'fraisClasse');
  }

  getListByFrais(idf: number): Observable<FraisClasse[]>{
    return this.http.get<FraisClasse[]>(this.source + 'fraisClasseByFrais/'+idf);
  }

  getOne(id: number): Observable<FraisClasse>{
    return this.http.get<FraisClasse>(this.source + 'fraisClasse/' +id);
  }

  create(body: any): Observable<FraisClasse>{
    return this.http.post<FraisClasse>(this.source + 'fraisClasse', body);
  }

  edit(body: any): Observable<FraisClasse>{
    return this.http.put<FraisClasse>(this.source + 'fraisClasse/'+ body.id, body);
  }

  delete(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'faisClasse/' +id);
  }

  getListTrancheFrais(): Observable<Tranche[]>{
    return this.http.get<Tranche[]>(this.source + 'trancheFraisClasse');
  }

  getOneTrancheFrais(id: number): Observable<Tranche>{
    return this.http.get<any>(this.source + 'trancheFraisClasse/'+id);
  }

  createTrancheFrais(body: any): Observable<Tranche>{
    return this.http.post<Tranche>(this.source + 'trancheFraisClasse', body);
  }

  editTrancheFrais(body: any): Observable<Tranche>{
    return this.http.put<Tranche>(this.source + 'trancheFraisClasse/'+body.id, body);
  }

  deleteTrancheFrais(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'trancheFraisClasse/'+id);
  }


}
