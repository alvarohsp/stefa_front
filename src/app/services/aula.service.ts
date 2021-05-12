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

}
