import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit {

  user: any
  cursos: Array <Curso> = []

  constructor(private service: CursoService, private router: Router) { }

  ngOnInit(): void {

    this.service.listar().subscribe(user => {
      this.cursos = user
    })
  }

  listarAulas = (id: any) => {
    this.router.navigate([`listar-aula`], {queryParams: { idCurso: id}})
  }

  novaAula = (id: any) => {
    this.router.navigate([`cadastro-aula`], {queryParams: { idCurso: id}})
  }

}