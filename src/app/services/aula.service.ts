import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Aula } from '../models/aula';

const URL = 'http://localhost:3000/stefanini/aula';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private httpClient: HttpClient) { }

  incluir(aula: Aula): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, aula);
  }

  listar(queryP: any): Observable<Aula[]> {
    const params = new HttpParams().set("idCurso", queryP)  
    return this.httpClient.get<Aula[]>(URL,{params});   
  }

  obterPorId(id: any, queryP: any): Observable<Aula> {
    const params = new HttpParams().set("idCurso", queryP)  
    return this.httpClient.get<Aula>(URL + '/' + id,{params});   
  }

  excluir(id: any, queryP: any): Observable<Mensagem> {
    const params = new HttpParams().set("idCurso", queryP) 
    return this.httpClient.delete<Mensagem>(URL + '/' + id,{params})
  }

  editar(id: Number, queryP: any, aula: Aula): Observable<Mensagem> {
    const params = new HttpParams().set("idCurso", queryP) 
    return this.httpClient.put<Mensagem>(URL + '/' + id, aula, {params})
  }

}
