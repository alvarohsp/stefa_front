import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';

const URL = 'http://localhost:3000/stefanini/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private httpClient: HttpClient) {}
  
  // #pegabandeira
  listar(): Observable<Professor[]> {
    return this.httpClient.get<Professor[]>(URL);
  }

  incluir(professor: Professor): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, professor);
  }

  obterPorId(id: any): Observable<Professor> {
    return this.httpClient.get<Professor>(URL + '/' + id);
  }

  editar(id: Number, professor: Professor): Observable<Mensagem> {
    return this.httpClient.put<Mensagem>(URL + '/' + id, professor)
  }

  excluir(id: Number): Observable<Mensagem> {
    return this.httpClient.delete<Mensagem>(URL + '/' + id)
  }
}
