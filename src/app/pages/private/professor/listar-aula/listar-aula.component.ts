import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/models/aula';
import { AulaService } from 'src/app/services/aula.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Curso } from 'src/app/models/curso';
import { CursoService } from 'src/app/services/curso.service';


@Component({
  selector: 'app-listar-aula',
  templateUrl: './listar-aula.component.html',
  styleUrls: ['./listar-aula.component.css']
})
export class ListarAulaComponent implements OnInit {

  queryP: any
  aulas: Array <Aula> = []
  cursoNome = ''

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private aulaService: AulaService, private cursoService: CursoService) { }

  ngOnInit(): void {

     this.activatedRoute.queryParams.subscribe(parametros =>{
      if (parametros['idCurso']){

        this.queryP = parametros.idCurso
        console.log(this.queryP)
        
        this.aulaService.listar(this.queryP).subscribe(aula =>{
          this.aulas = aula
        })

        this.cursoService.obterPorId(this.queryP).subscribe(sub =>{
          this.cursoNome = sub.nome
        })
      }
    })
    
  }

}
