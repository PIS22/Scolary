import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe } from '../app/pages/def/classe/classe.component';
import { Niveau } from '../app/pages/param/niveau/niveau.component';


@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }

  //Les niveaux

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

  //Les classes
  getList(): Observable<Classe[]>{
    return this.http.get<Classe[]>(this.source + 'classe');
  }

  getForEtab(idet:any, idas: any): Observable<Classe[]>{
    return this.http.get<Classe[]>(this.source + 'classeByIdEts/'+idet+'/'+idas);
  }

  getOne(id: number): Observable<Classe>{
    return this.http.get<any>(this.source + 'classe/'+id);
  }

  create(body: any): Observable<Classe>{
    return this.http.post<Classe>(this.source + 'classe', body);
  }

  edit(body: any): Observable<Classe>{
    return this.http.put<Classe>(this.source + 'classe/'+body.id, body);
  }

  delete(id: number){
    this.http.delete(this.source + 'classe/'+id);
  }


}
