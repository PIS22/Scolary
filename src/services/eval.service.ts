import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluation, Note, TypeEval } from '../app/pages/param/type-evaluation/type-evaluation.component';


@Injectable({
  providedIn: 'root'
})
export class EvalService {

  source='http://localhost:8084/gs/'
  constructor(private http: HttpClient) { }
  getListType(): Observable<TypeEval[]>{
    return this.http.get<TypeEval[]>(this.source + 'typeEvaluation');
  }

  getOneType(id: number): Observable<TypeEval>{
    return this.http.get<any>(this.source + 'typeEvaluation/'+id);
  }

  createType(body: any): Observable<TypeEval>{
    return this.http.post<TypeEval>(this.source + 'typeEvaluation', body);
  }

  editType(body: any): Observable<TypeEval>{
    return this.http.put<TypeEval>(this.source + 'typeEvaluation/'+body.id, body);
  }

  deleteType(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'typeEvaluation/'+id);
  }

  getList(): Observable<Evaluation[]>{
    return this.http.get<Evaluation[]>(this.source + 'evaluation');
  }

  getOne(id: number): Observable<Evaluation>{
    return this.http.get<Evaluation>(this.source + 'evaluation/'+id);
  }

  create(body: any): Observable<Evaluation>{
    return this.http.post<Evaluation>(this.source + 'evaluation', body);
  }

  edit(body: any): Observable<Evaluation>{
    return this.http.put<Evaluation>(this.source + 'evaluation/'+body.id, body);
  }

  delete(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'evaluation/'+id);
  }

  getListNote(): Observable<Note[]>{
    return this.http.get<Note[]>(this.source + 'note');
  }

  getOneNote(id: number): Observable<Note>{
    return this.http.get<Note>(this.source + 'note/'+id);
  }

  createNote(body: any): Observable<Note>{
    return this.http.post<Note>(this.source + 'note', body);
  }

  editNote(body: any): Observable<Note>{
    return this.http.put<Note>(this.source + 'note/'+body.id, body);
  }

  deleteNote(id: number):Observable<boolean>{
    return this.http.delete<boolean>(this.source + 'note/'+id);
  }

}
