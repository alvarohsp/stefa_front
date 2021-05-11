import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Curso } from '../models/curso';

const URL = 'http://localhost:3000/stefanini/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private httpClient: HttpClient) { }

  incluir(curso: Curso): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, curso);
  }

  listar(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(URL);
  }
}